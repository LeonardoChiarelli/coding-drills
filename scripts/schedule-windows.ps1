# Usage: schedule-windows.ps1 -RepoPath <path> -Generate HH:MM -Review HH:MM
param([string]$RepoPath, [string]$Generate = "21:00", [string]$Review = "07:00")
function Set-DrillTask($Name, $Time, $Script) {
  schtasks /Delete /F /TN $Name 2>$null | Out-Null
  $cmd = "node `"$RepoPath\scripts\$Script`""
  schtasks /Create /F /SC DAILY /TN $Name /ST $Time /TR $cmd | Out-Null
}
Set-DrillTask "CodingDrillsGenerate" $Generate "run-generate.mjs"
Set-DrillTask "CodingDrillsReview" $Review "run-review.mjs"
Write-Output "Scheduled tasks installed"
