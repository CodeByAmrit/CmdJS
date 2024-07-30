const cmdKeywords = [
  'cd',
  'chdir',
  'dir',
  'mkdir',
  'md',
  'rmdir',
  'rd',
  'del',
  'erase',
  'copy',
  'xcopy',
  'move',
  'attrib',
  'chkdsk',
  'diskpart',
  'format',
  'label',
  'systeminfo',
  'tasklist',
  'taskkill',
  'shutdown',
  'cls',
  'echo',
  'ping',
  'ipconfig',
  'netstat',
  'tracert',
  'nslookup',
  'net',
  'net user',
  'net localgroup',
  'whoami',
  'set',
  'path',
  'reg',
  'pause',
  'goto',
  'if',
  'for',
  'help'
]

// Function to search for a command
function searchCommand (keyword) {
  const result = cmdKeywords.filter(cmd => cmd.includes(keyword))
  if (result.length > 0) {
    return true
  } else {
    return false
  }
}
window.addEventListener('load', () => {
  document.getElementById('cmd_input').focus()
})
document.getElementById('cmd_result_body').addEventListener('click', () => {
  document.getElementById('cmd_input').focus()
})
const container = document.getElementById('result_group')
document
  .getElementById('cmd_input')
  .addEventListener('keypress', function (event) {
    if (event.key === 'Enter') {
      let command = this.value

      let newDiv = document.createElement('div')
      newDiv.className = 'result'
      newDiv.innerHTML = `<p class="cmdLineContent">C:\\Users\\amrit> ${command}</p>`

      // Get all child nodes
      const children = container.children
      container.insertBefore(newDiv, children[children.length - 1])

      this.value = ''

      fetch(`/cmd/${command}`)
        .then(response => response.json())
        .then(data => {
          if (data.success) {
            // console.log(data.output)
            const output = data.output

            let newDiv = document.createElement('div')
            newDiv.className = 'result'
            newDiv.innerHTML = `<p class="cmdLineContent" style="width:100%;">${output}</p>`

            // Get all child nodes
            const children = container.children
            container.insertBefore(newDiv, children[children.length - 1])

            container.scrollTop = container.scrollHeight
          } else {
            const output = data.error

            let newDiv = document.createElement('div')
            newDiv.className = 'result'
            newDiv.innerHTML = `<p class="cmdLineContent" style="width:100%;">${output}</p>`

            // Get all child nodes
            const children = container.children
            container.insertBefore(newDiv, children[children.length - 1])

            container.scrollTop = container.scrollHeight
          }
        })
        .catch(error => console.error('Error fetching data:', error))

      if (command === 'cls' || command === 'clear') {
        location.reload()
      }
    }
    if (searchCommand(this.value)) {
      document.getElementById('cmd_input').style.color = 'skyblue'
    } else {
      document.getElementById('cmd_input').style.color = 'white'
    }
  })

document.getElementById('cmd_input'), addEventListener('keypress', () => {})
