#! /usr/bin/env -S node -r esm

/*************************************************************************
 *
 *  simple/tex2svg
 *
 *  Uses MathJax v3 to convert a TeX string to an SVG string.
 *
 * ----------------------------------------------------------------------
 *
 *  Copyright (c) 2019 The MathJax Consortium
 *
 *  Licensed under the Apache License, Version 2.0 (the "License");
 *  you may not use this file except in compliance with the License.
 *  You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 *  Unless required by applicable law or agreed to in writing, software
 *  distributed under the License is distributed on an "AS IS" BASIS,
 *  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *  See the License for the specific language governing permissions and
 *  limitations under the License.
 */


//
//  The default TeX packages to use
//
const PACKAGES = 'base, autoload, require, ams, newcommand';

//
//  Minimal CSS needed for stand-alone image
//
const CSS = [
  'svg a{fill:blue;stroke:blue}',
  '[data-mml-node="merror"]>g{fill:red;stroke:red}',
  '[data-mml-node="merror"]>rect[data-background]{fill:yellow;stroke:none}',
  '[data-frame],[data-line]{stroke-width:70px;fill:none}',
  '.mjx-dashed{stroke-dasharray:140}',
  '.mjx-dotted{stroke-linecap:round;stroke-dasharray:0,140}',
  'use[data-c]{stroke-width:3px}'
].join('');

//
//  Get the command-line arguments
//
var argv = {
  equation: "2^3",
  inline: false,
  em: 16,
  ex: 8,
  width: 80 * 16,
  packages: PACKAGES,
  styles: true,
  container: false,//boolean true
  css: false, //boolean true
  fontCache: true,
  assistiveMml: false, //boolean true
  dist: false
}

//
// Load MathJax and initialize MathJax and typeset the given math
//
require('mathjax-full').init({
  //
  //  The MathJax configuration
  //
  options: {
    enableAssistiveMml: argv.assistiveMml
  },
  loader: {
    source: (argv.dist ? {} : require('mathjax-full/components/src/source.js').source),
    load: ['adaptors/liteDOM', 'tex-svg']
  },
  tex: {
    packages: argv.packages.replace('\*', PACKAGES).split(/\s*,\s*/)
  },
  svg: {
    fontCache: (argv.fontCache ? 'local' : 'none')
  },
  startup: {
    typeset: false
  }
}).then((MathJax) => {
  //
  //  Typeset and display the math
  //
  MathJax.tex2svgPromise(argv.equation || '', {
    display: !argv.inline,
    em: argv.em,
    ex: argv.ex,
    containerWidth: argv.width
  }).then((node) => {
    const adaptor = MathJax.startup.adaptor;
    //
    //  If the --css option was specified, output the CSS,
    //  Otherwise, output the typeset math as SVG
    //
    if (argv.css) {
      console.log(adaptor.textContent(MathJax.svgStylesheet()));
    } else {
      let html = (argv.container ? adaptor.outerHTML(node) : adaptor.innerHTML(node));
      console.log(argv.styles ? html.replace(/<defs>/, `<defs><style>${CSS}</style>`) : html);
    };
  });
}).catch(err => console.log(err));
