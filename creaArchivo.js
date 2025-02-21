const fs = require("fs");
const path = require("path");

const SCSS_DIR = "src/scss";

function crearSCSS(rutaCompleta) {
    const carpeta = path.join(SCSS_DIR, rutaCompleta);
    const nombre = path.basename(rutaCompleta);
    const indexPath = path.join(carpeta, "_index.scss");
    const scssPath = path.join(carpeta, `_${nombre}.scss`);
    const appScssPath = path.join(SCSS_DIR, "app.scss");

    if (!fs.existsSync(carpeta)) {
        fs.mkdirSync(carpeta, { recursive: true });
        console.log(`📂 Carpeta creada: ${carpeta}`);
    }

    fs.writeFileSync(indexPath, `@forward "${nombre}";\n`);
    console.log(`📄 Archivo creado: ${indexPath}`);

    const variablesImport = `@use "../../base/variables" as v;\n`;
    fs.writeFileSync(scssPath, variablesImport);
    console.log(`📄 Archivo creado: ${scssPath} con import de variables`);

    const useStatement = `@use "${rutaCompleta}";`;
    let appScssContent = fs.existsSync(appScssPath) ? fs.readFileSync(appScssPath, "utf8") : "";

    if (!appScssContent.includes(useStatement)) {
        fs.appendFileSync(appScssPath, `\n${useStatement}`);
        console.log(`✅ Se agregó @use "${rutaCompleta}" en app.scss`);
    } else {
        console.log(`⚠️ app.scss ya contiene @use "${rutaCompleta}"`);
    }
}

const rutaCompleta = process.argv[2];

if (!rutaCompleta) {
    console.error("❌ Debes proporcionar la ruta completa. Ejemplo: node crearArchivos.js ui/nosotros");
    process.exit(1);
}

crearSCSS(rutaCompleta);