const {
  default: makeWASocket,
  useMultiFileAuthState,
  fetchLatestBaileysVersion,
  makeInMemoryStore,
  DisconnectReason
} = require('@whiskeysockets/baileys');
const pino = require('pino');

async function startBot() {
  const { state, saveCreds } = await useMultiFileAuthState('./session');
  const { version } = await fetchLatestBaileysVersion();

  const sock = makeWASocket({
    version,
    logger: pino({ level: 'silent' }),
    printQRInTerminal: false,
    auth: state,
  });

  sock.ev.on('creds.update', saveCreds); 
      }
    }
  }
});

  // Event pesan masuk
  sock.ev.on('messages.upsert', async ({ messages, type }) => {
    if (type !== 'notify') return;
    const msg = messages[0];
    if (!msg.message || msg.key.fromMe) return;

    const from = msg.key.remoteJid;
    const text = msg.message.conversation || msg.message.extendedTextMessage?.text;
    if (!text) return;

    const lowerText = text.toLowerCase();

    switch (lowerText) {
      case 'menu':
        await sock.sendMessage(from, {
          text: `*Bot Store Menu*
Ketik salah satu keyword:

- buyadp
- buypanel
- buynokosindo
- buynokosluar
- joinmurnok
- joinresellerpanel
- joinmuriduporkut
- buyscriptbot

Contoh: ketik *buyadp* untuk beli ADP.`,
        });
        break;

      case 'buyadp':
        await sock.sendMessage(from, {
          text: 'Harga ADP: Rp10.000\nPayment Ke Admin.',
        });
        break;

      case 'buypanel':
        await sock.sendMessage(from, {
          text: 'Panel tersedia:\n- 1K/Gb Unli?11K\nPayment Ke Admin.',
        });
        break;

      case 'buynokosindo':
        await sock.sendMessage(from, {
          text: 'Nomor kosong Indonesia tersedia Rp7.000\nBisa digunakan untuk verifikasi.\nChat admin untuk order.',
        });
        break;

      case 'buynokosluar':
        await sock.sendMessage(from, {
          text: 'Nomor kosong luar negeri tersedia Rp17.000- Rp35.000\nChat admin untuk beli.',
        });
        break;

      case 'joinmurnok':
        await sock.sendMessage(from, {
          text: 'Biaya join Murnok: Rp4.000\nBenefit: akses reseller nomor kosong\nChat admin untuk bergabung.',
        });
        break;

      case 'joinresellerpanel':
        await sock.sendMessage(from, {
          text: 'Join reseller panel mulai dari Rp5.000\nAkses ke banyak produk otomatis.\nChat admin sekarang.',
        });
        break;

      case 'joinmuriduporkut':
        await sock.sendMessage(from, {
          text: 'Benefit\nMurid Up Orkut ? Bisa Stok Orkut Dll\nPayment/Benefit Lainnya Ke Admin Segera',
        });
        break;

      case 'buyscriptbot':
        await sock.sendMessage(from, {
          text: 'Script bot tersedia:\n- Script Cpanel V8\n- Script Bot Pushkontak ( Support Pairing Code )\n- Script Bot Simpel Menu V4\nHubungi admin untuk beli.',
        });
        break;

      default:
        await sock.sendMessage(from, {
          text: 'Perintah tidak dikenali. Ketik *menu* untuk melihat daftar perintah.',
        });
    }
  });
}

startBot();
