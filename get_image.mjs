import fs from "fs"
import fetch from 'node-fetch'
import AdmZip from 'adm-zip'

const zipUrl = 'https://huggingface.co/datasets/fkunn1326/aipic/resolve/main/images.zip'; 
const downloadPath = './images.zip';
const extractionPath = './public';

async function downloadZipFile() {
  try {
    const response = await fetch(zipUrl);
    if (!response.ok) {
      throw new Error(`ダウンロード中にエラーが発生しました。HTTPステータスコード: ${response.status}`);
    }

    const buffer = Buffer.from(await response.arrayBuffer());
    fs.writeFileSync(downloadPath, buffer);
    console.log('ZIPファイルのダウンロードが完了しました。');

    extractZipFile();
  } catch (error) {
    console.error('ZIPファイルのダウンロード中にエラーが発生しました:', error.message);
  }
}

function extractZipFile() {
  try {
    const zip = new AdmZip(downloadPath);
    zip.extractAllTo(extractionPath, true);
    console.log('ZIPファイルが展開されました。');
  } catch (error) {
    console.error('ZIPファイルの展開中にエラーが発生しました:', error.message);
  }
}

downloadZipFile();