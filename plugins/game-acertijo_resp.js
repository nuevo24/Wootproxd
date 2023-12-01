import similarity from 'similarity'
const threshold = 0.72
let handler = m => m
handler.before = async function (m) {
let id = m.chat
if (!m.quoted || !m.quoted.fromMe || !m.quoted.isBaileys || !/^ⷮ/i.test(m.quoted.text)) return !0
this.tekateki = this.tekateki ? this.tekateki : {}
if (!(id in this.tekateki)) return m.reply('EL ACERTIJO YA TERMINÓ OE')
if (m.quoted.id == this.tekateki[id][0].id) {
let json = JSON.parse(JSON.stringify(this.tekateki[id][1]))
if (m.text.toLowerCase() == json.response.toLowerCase().trim()) {
global.db.data.users[m.sender].exp += this.tekateki[id][2]
m.reply(`*RESPUESTA CORRECTA*\n+${this.tekateki[id][2]} Exp`)
clearTimeout(this.tekateki[id][3])
delete this.tekateki[id]
} else if (similarity(m.text.toLowerCase(), json.response.toLowerCase().trim()) >= threshold) m.reply(`Casi lo logras!`)
else m.reply(' RESPUESTA INCORRECTA!')}
return !0
}
handler.exp = 0
handler.register = true
export default handler
