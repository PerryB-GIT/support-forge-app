# Test version detection logic from the installer
function Get-InstalledVersion {
    param([string]$Command, [string]$VersionArg = '--version')
    try {
        $output = & $Command $VersionArg 2>&1 | Out-String
        if ($output -match '(\d+\.\d+\.\d+)') {
            return [Version]$Matches[1]
        }
    } catch {
        return $null
    }
    return $null
}

$NodeMinVersion = [Version]'18.0.0'
$PythonMinVersion = [Version]'3.10.0'
$GitMinVersion = [Version]'2.30.0'

Write-Host '=== Version Detection Test ===' -ForegroundColor Cyan
Write-Host ''

# Git
$gitVer = Get-InstalledVersion 'git'
if ($gitVer) {
    $color = if ($gitVer -ge $GitMinVersion) { 'Green' } else { 'Red' }
    $status = if ($gitVer -ge $GitMinVersion) { 'PASS (>= 2.30.0)' } else { 'FAIL (< 2.30.0)' }
    Write-Host "Git: $gitVer - $status" -ForegroundColor $color
} else {
    Write-Host 'Git: NOT FOUND - Would install' -ForegroundColor Yellow
}

# Node
$nodeVer = Get-InstalledVersion 'node'
if ($nodeVer) {
    $color = if ($nodeVer -ge $NodeMinVersion) { 'Green' } else { 'Red' }
    $status = if ($nodeVer -ge $NodeMinVersion) { 'PASS (>= 18.0.0)' } else { 'FAIL (< 18.0.0)' }
    Write-Host "Node.js: $nodeVer - $status" -ForegroundColor $color
} else {
    Write-Host 'Node.js: NOT FOUND - Would install' -ForegroundColor Yellow
}

# Python
$pyVer = Get-InstalledVersion 'python'
if ($pyVer) {
    $color = if ($pyVer -ge $PythonMinVersion) { 'Green' } else { 'Red' }
    $status = if ($pyVer -ge $PythonMinVersion) { 'PASS (>= 3.10.0)' } else { 'FAIL (< 3.10.0)' }
    Write-Host "Python: $pyVer - $status" -ForegroundColor $color
} else {
    Write-Host 'Python: NOT FOUND - Would install' -ForegroundColor Yellow
}

# Docker
$dockerVer = Get-InstalledVersion 'docker'
if ($dockerVer) {
    Write-Host "Docker: $dockerVer - PASS" -ForegroundColor Green
} else {
    Write-Host 'Docker: NOT FOUND - Would install' -ForegroundColor Yellow
}

# Claude
$claudeVer = Get-InstalledVersion 'claude'
if ($claudeVer) {
    Write-Host "Claude Code: $claudeVer - PASS" -ForegroundColor Green
} else {
    Write-Host 'Claude Code: NOT FOUND - Would install' -ForegroundColor Yellow
}

Write-Host ''
Write-Host '=== Test Complete ===' -ForegroundColor Cyan
