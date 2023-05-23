const { promises } = require('fs')
const { join } = require('path')
const { Resvg } = require('@resvg/resvg-js')

async function main() {
  const svg = await promises.readFile(join(__dirname, './a.svg'))
  const opts = {
    background: 'rgba(238, 235, 230, .9)',
    fitTo: {
      mode: 'width',
      value: 1200,
    },
    font: {
      fontFiles: ['./LiberationMono-Regular.ttf'], // Load custom fonts.
      loadSystemFonts: false, // It will be faster to disable loading system fonts.
      defaultFontFamily: 'Source Han Serif CN Light',
    },
  }
  const resvg = new Resvg(svg, opts)
  const pngData = resvg.render()
  const pngBuffer = pngData.asPng()

  console.info('Original SVG Size:', `${resvg.width} x ${resvg.height}`)
  console.info('Output PNG Size  :', `${pngData.width} x ${pngData.height}`)

  await promises.writeFile(join(__dirname, './text-out.png'), pngBuffer)
}

main()
