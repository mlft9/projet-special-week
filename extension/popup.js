let currentTab = null

// Get current tab info on popup open
chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
  currentTab = tabs[0]
  
  // Check if data was passed from context menu
  chrome.storage.local.get(['ealerte.contextMenuUrl', 'ealerte.contextMenuSite', 'ealerte.contextMenuSelection'], (result) => {
    let url = result['ealerte.contextMenuUrl'] || currentTab?.url
    let site = result['ealerte.contextMenuSite']
    let selectedText = result['ealerte.contextMenuSelection']
    
    if (url) {
      document.getElementById('articleUrl').value = url
      
      // Try to extract domain name if not from context menu
      if (!site) {
        try {
          const urlObj = new URL(url)
          site = urlObj.hostname.replace('www.', '')
        } catch {
          // If URL parsing fails, leave it empty
        }
      }
      
      if (site) {
        document.getElementById('siteName').value = site
      }
    }
    
    // Pre-fill article title with selected text if available
    if (selectedText) {
      document.getElementById('articleTitle').value = selectedText
    }
    
    // Clear the stored context menu data
    chrome.storage.local.remove(['ealerte.contextMenuUrl', 'ealerte.contextMenuSite', 'ealerte.contextMenuSelection'])
  })
})

// Close button
document.getElementById('closeBtn').addEventListener('click', () => {
  window.close()
})

document.getElementById('cancelBtn').addEventListener('click', () => {
  window.close()
})

// Form submit
document.getElementById('reportForm').addEventListener('submit', async (e) => {
  e.preventDefault()
  
  const submitBtn = document.getElementById('submitBtn')
  const statusDiv = document.getElementById('status')
  
  submitBtn.disabled = true
  statusDiv.textContent = 'Envoi en cours…'
  statusDiv.className = 'status'
  
  try {
    const reportData = {
      siteName: document.getElementById('siteName').value,
      articleTitle: document.getElementById('articleTitle').value,
      articleUrl: document.getElementById('articleUrl').value,
      reportReason: document.getElementById('reportReason').value,
      aiUsageType: document.getElementById('aiUsageType').value,
      reporterName: document.getElementById('reporterName').value || undefined,
    }

    const response = await fetch('https://e-alerte.com/api/reports', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(reportData),
    })

    const payload = await response.json()

    if (!response.ok) {
      throw new Error(payload.error || 'Échec de l\'envoi')
    }

    statusDiv.textContent = '✅ Signalement enregistré. Merci pour ta vigilance !'
    statusDiv.className = 'status success'
    
    // Reset form and close after 1.5s
    setTimeout(() => {
      document.getElementById('reportForm').reset()
      window.close()
    }, 1500)
  } catch (error) {
    statusDiv.textContent = `❌ ${error instanceof Error ? error.message : 'Erreur inattendue'}`
    statusDiv.className = 'status error'
    submitBtn.disabled = false
  }
})
