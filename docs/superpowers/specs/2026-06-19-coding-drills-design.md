# Coding Drills — Design

**Data:** 2026-06-19
**Status:** Aprovado para planejamento
**Autor:** Leonardo Chiarelli (+ Claude)

## Resumo

Repositório template open-source que gera, todo dia, 10 exercícios de programação
(lógica, algoritmos, estruturas de dados, arquitetura) em markdown, e no dia seguinte
revisa a resolução do usuário com feedback acionável. O sistema é **adaptativo**: a
revisão alimenta um estado de progresso que enviesa a próxima geração para os pontos
fracos do usuário.

Dois jobs locais agendados no SO disparam o Claude Code em modo headless (`claude -p`):

- **Geração (default 21:00):** lê estado + config, gera 10 exercícios, commita e dá push.
- **Revisão (default 07:00):** acha a branch de resolução, analisa o diff, grava
  `FEEDBACK.md`, atualiza o estado, commita e dá push.

O repositório é distribuído como template. Um **installer CLI standalone (Node)** roda
um wizard de configuração e registra os dois jobs no agendador do SO da pessoa —
sem depender de IA no setup. O Claude só entra na geração/revisão diária.

## Objetivos

- Treino diário consistente e progressivo, com mínimo atrito manual.
- Loop adaptativo real: erros de ontem moldam os exercícios de amanhã.
- Reuso por terceiros via bootstrap cross-OS, sem conhecimento profundo de Claude Code.

## Não-objetivos (Out of Scope)

- Execução/correção automática rodando o código do usuário (sandbox de execução). A
  revisão é por leitura/análise do diff, não por rodar testes contra a solução.
- Web app, dashboard ou UI. Tudo é arquivo no repo + git.
- Multiusuário num mesmo repo. Cada pessoa tem o próprio fork/repo e estado.
- Hospedagem em nuvem do agendamento (GitHub Actions etc.). Decisão: agendamento local.
- Gamificação, streaks sociais, ranking.

## Decisões travadas (do brainstorm)

| Decisão | Escolha |
| --- | --- |
| Mecanismo de agendamento | Local, via agendador do SO (não nuvem) |
| Seleção dos exercícios | Adaptativa ao histórico/erros do usuário |
| Linguagem por exercício | Claude escolhe livremente (com opção de restringir) |
| Entrega do feedback | Arquivo `FEEDBACK.md` + atualiza estado adaptativo |
| Localizar resolução | Branch por convenção `solve/week-NN/day-NN`; vazia = pula |
| Composição dos 10 | Mix diário (~4 lógica, 3 algoritmos, 3 estruturas); arquitetura = 1 desafio semanal |
| Distribuição | Template open-source + installer CLI standalone (IA opcional no setup) |
| Config personalizada | Horários, nível+pilares, qtd+linguagens, repo+remote |

## Arquitetura

Dois jobs agendados no SO chamam wrappers Node, que chamam `claude -p` com um prompt
versionado no repo. O estado compartilhado entre os jobs é um arquivo JSON no repo,
sincronizado via git.

```
Agendador SO (21:00) ──> run-generate.mjs ──> git pull ──> claude -p prompts/generate.md ──> escreve weeks/.. + state ──> commit+push
Agendador SO (07:00) ──> run-review.mjs   ──> git pull ──> claude -p prompts/review.md   ──> escreve FEEDBACK + state ──> commit+push
```

Fluxo de loop adaptativo:

```
review (07h) ── escreve ──> state/progress.json ── lê ──> generate (21h)
```

### Estrutura do repositório

```
coding-drills/
  install.mjs              # wizard CLI: config + init repo + registra agendador
  scripts/
    schedule-windows.ps1   # registra 2 tasks no Task Scheduler (schtasks)
    schedule-macos.sh      # 2 plists launchd
    schedule-linux.sh      # 2 entradas crontab
    run-generate.mjs       # wrapper: pull -> claude -p generate -> commit+push
    run-review.mjs         # wrapper: pull -> claude -p review -> commit+push
  lib/
    adapt.mjs              # lógica pura testável: progress.json -> plano dos 10
  prompts/
    generate.md            # instrução das 21h
    review.md              # instrução das 7h
  config/
    settings.json          # horários, nível, pilares, qtd, linguagens, remote
  state/
    progress.json          # pontos fracos, linguagens travadas, dificuldade, histórico
    logs/                  # logs das execuções dos jobs
  weeks/
    week-01/
      day-01/
        README.md          # 10 exercícios em markdown
        FEEDBACK.md        # gerado pela revisão das 7h
  __tests__/               # testes co-localizados (node --test)
  README.md                # uso + contribuição
```

### Convenção de branch

Usuário resolve em branch `solve/week-NN/day-NN`. A revisão das 7h localiza a branch
pela convenção (do dia anterior) e analisa o diff contra o `README.md` daquele dia.
Branch ausente ou sem commits novos = sem resolução: grava nota no estado e sai sem
gerar `FEEDBACK.md`.

## Componentes

### `config/settings.json` (fixo por pessoa, escrito pelo wizard)

```json
{
  "schedule": { "generate": "21:00", "review": "07:00", "timezone": "America/Sao_Paulo" },
  "level": "intermediate",
  "pillars": { "logic": true, "algorithms": true, "dataStructures": true, "architecture": true },
  "exercisesPerDay": 10,
  "languages": { "mode": "free", "allowed": [] },
  "git": { "remote": "git@github.com:user/coding-drills.git", "autoPush": true }
}
```

- `level`: `beginner` | `intermediate` | `advanced` — semeia `difficulty` inicial.
- `languages.mode`: `free` (Claude escolhe) | `restricted` (só `allowed[]`).
- `autoPush`: se `false`, jobs commitam local sem push.

### `state/progress.json` (vivo; revisão escreve, geração lê)

```json
{
  "currentWeek": 1,
  "currentDay": 3,
  "difficulty": 0.45,
  "weakSpots": [
    { "topic": "recursion", "misses": 3, "lastSeen": "2026-06-18" },
    { "topic": "hash maps", "misses": 1, "lastSeen": "2026-06-17" }
  ],
  "languageFriction": [ { "lang": "rust", "struggles": 2 } ],
  "history": [
    { "day": "week-01/day-02", "score": 0.7, "solved": 7, "total": 10 }
  ]
}
```

- `difficulty` ∈ [0,1]: sobe com score alto, desce com score baixo.
- `weakSpots`: enviesa 30-40% da composição da próxima geração.
- `languageFriction`: evita empilhar linguagens onde o usuário travou repetidamente.

### `lib/adapt.mjs` (lógica pura, testável)

Dado `settings.json` + `progress.json`, retorna o plano dos 10 exercícios do dia:
para cada slot, `{ pillar, biasedTopic?, difficulty }`. É a parte determinística da
adaptação, extraída do prompt para poder ser testada sem chamar o Claude. Também expõe
o cálculo de atualização de `difficulty` e `weakSpots` a partir de um score de revisão.

Regras:
- Composição base: ~4 logic, 3 algorithms, 3 dataStructures. Sexta-feira: substitui 1
  slot por 1 desafio de architecture (maior).
- Pilares desligados em `settings` são redistribuídos entre os ligados.
- 30-40% dos slots recebem `biasedTopic` vindo dos `weakSpots` (mais recentes/frequentes primeiro).
- `difficulty` move ±0.05–0.1 por dia conforme score vs faixa-alvo.

### `prompts/generate.md` (21h)

1. Lê `settings.json` + `progress.json`.
2. Obtém o plano dos 10 via `lib/adapt.mjs` (ou reproduz a lógica).
3. Escolhe linguagem por exercício (livre, respeitando `languages.mode` e evitando
   empilhar `languageFriction`).
4. Escreve `weeks/week-NN/day-NN/README.md`: para cada exercício — título, enunciado,
   exemplos de entrada/saída, restrições, dificuldade, **linguagem exigida**.
5. Incrementa `currentDay` (e `currentWeek` a cada 7), persiste `progress.json`.
6. Commit + push (se `autoPush`).

### `prompts/review.md` (7h)

1. Lê `settings.json`; calcula o dia anterior; acha branch `solve/week-NN/day-NN`.
2. Branch ausente/vazia → grava nota "sem resolução ontem" no `progress.json`, sai.
3. Diff vs `README.md`: por exercício, avalia correção, complexidade, estilo, edge cases.
4. Escreve `FEEDBACK.md` no diretório do dia: acertos, erros + correção, dica de
   melhoria, alternativa idiomática por exercício.
5. Atualiza `progress.json`: `score`, `weakSpots`, `difficulty`, `history` (via `lib/adapt.mjs`).
6. Commit + push (se `autoPush`).

### `run-generate.mjs` / `run-review.mjs` (wrappers finos)

`cd` no repo → `git pull` → `claude -p "$(cat prompts/X.md)" --permission-mode acceptEdits`
→ loga stdout/stderr + exit em `state/logs/`. Erro não quebra silencioso: loga e sai
com código != 0 para o agendador registrar.

### `install.mjs` (wizard, roda 1x por pessoa)

1. **Preflight:** Node ≥18, `git`, `claude` CLI presente + autenticado (smoke
   `claude -p "ok"`). Falta algo → erro claro com link, aborta.
2. **Wizard:** pergunta os 4 grupos (horários, nível+pilares, qtd+linguagens, remote).
   Defaults: 21:00/07:00, intermediate, 4 pilares, 10, free.
3. **Escreve** `config/settings.json` e semeia `state/progress.json` (week 1, day 0,
   difficulty por nível).
4. **Git:** init se preciso, set remote, commit inicial, push.
5. **Detecta SO** e chama o script:
   - Windows → `schedule-windows.ps1`: 2 tasks via `schtasks` rodando
     `node run-generate.mjs` (21h) e `node run-review.mjs` (7h).
   - macOS → `schedule-macos.sh`: 2 plists `launchd` em `~/Library/LaunchAgents`.
   - Linux → `schedule-linux.sh`: 2 entradas no `crontab`.
6. **Verifica:** lê o agendamento de volta, confirma as 2 entradas, imprime resumo +
   instrução de desinstalação.

**Idempotência:** rerodar o installer remove tasks/entradas existentes antes de recriar
(sem duplicar).

## Tratamento de erros

- Preflight falho aborta o installer com mensagem acionável (o que falta + como instalar).
- Wrappers logam e retornam exit != 0; nunca falham silenciosos.
- `git pull` com conflito: wrapper aborta o job, loga, não força nada (sem `reset --hard`).
- `claude -p` falha/timeout: loga stderr, sai != 0; o dia simplesmente não gera/revisa.
- Branch de resolução ausente é fluxo normal, não erro.

## Estratégia de testes

Sem nuvem, sem API key — tudo local. Runner: `node --test` (nativo, zero dep).
Co-localizado em `__tests__/`.

- **`lib/adapt.mjs` (núcleo):** funções puras. Testa composição (pilares lig/deslig,
  sexta = architecture), viés por `weakSpots`, movimento de `difficulty` por score,
  atualização de `weakSpots`.
- **Installer:** wizard com input mockado → assert `settings.json`/`progress.json`.
  Preflight falha quando falta `claude`/`git`. Idempotência (rerun não duplica).
- **Schedulers:** dry-run por SO — gera comando/plist/crontab esperado (snapshot), sem
  registrar de verdade no CI. Registro real só em teste manual local.
- **Wrappers:** `claude`/`git` fake no PATH → assert ordem pull→claude→commit→push e
  log de erro.
- **Smoke E2E manual:** roda `run-generate.mjs` real 1x, confere README gerado e push.

## Dependências e pré-requisitos

- Node ≥18 (instalador + wrappers + lib).
- `git` e (para push) remote GitHub configurável.
- **Claude Code CLI instalado e autenticado** na máquina de cada usuário — requisito
  duro da geração/revisão diária. O installer verifica no preflight.
- Máquina precisa estar ligada nos horários agendados (consequência do agendamento local).

## Riscos e mitigação

- **PC desligado no horário:** job não roda. Mitigação: documentar; jobs são idempotentes
  por dia e o usuário pode rodar o wrapper manualmente.
- **Custo/tempo de `claude -p`:** cada run consome a sessão do usuário. Mitigação: prompts
  enxutos, 1 run por job.
- **Variação de qualidade do LLM:** exercícios/feedback podem variar. Mitigação: `lib/adapt.mjs`
  fixa a parte determinística; prompts com estrutura de saída explícita.
- **Cross-OS frágil:** agendadores diferentes. Mitigação: scripts por SO testados via
  snapshot + verificação pós-registro no installer.
```
