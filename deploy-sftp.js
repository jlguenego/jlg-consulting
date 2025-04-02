// deploy-sftp.js
import SftpClient from "ssh2-sftp-client";
import dotenv from "dotenv";

dotenv.config();

const sftp = new SftpClient();

const config = {
  host: process.env.SFTP_HOST,
  port: parseInt(process.env.SFTP_PORT || "22"),
  username: process.env.SFTP_USER,
  password: process.env.SFTP_PASSWORD,
};

const localDir = "dist";
const remoteDir = process.env.SFTP_REMOTE_DIR;

async function deploy() {
  try {
    console.log("🔐 Connexion SFTP en cours...");
    await sftp.connect(config);
    console.log("✅ Connecté à OVH");

    // Nettoyage optionnel du dossier distant :
    // console.log('🧹 Nettoyage du dossier distant...');
    // await sftp.rmdir(remoteDir, true);
    // await sftp.mkdir(remoteDir, true);

    console.log(`📤 Envoi de ${localDir} vers ${remoteDir}`);
    await sftp.uploadDir(localDir, remoteDir);

    console.log("✅ Déploiement terminé avec succès 🚀");
  } catch (err) {
    console.error("❌ Erreur pendant le déploiement :", err.message);
  } finally {
    sftp.end();
  }
}

deploy();
