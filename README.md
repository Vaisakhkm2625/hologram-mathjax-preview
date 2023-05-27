# Hologram-Mathjax-preview

A simple latex preview for solution for Neovim 

> IT WAS A DUMB IDEA TO USE MATHJAX... 
> archiving this, here is the new project with proper latex engine  - https://github.com/Vaisakhkm2625/hologram-math-preview.nvim 



## steps
- [X] example implementation for mathjax-node for svg creation 
- [X] example implementation for svg to png without browser -> resvg/resvg-js 
- [ ] integrating *resvg* & *mathjax* to produce png for any latex input
- [ ] starting treesitter integration - recoginzing $$,$ \( \), \[,\] and @math @end symbols
- [ ] integration with hologram - image preview 
- [ ] .
- [ ] .
- [ ] making clone for `mathjax-node-svg2png` npm package (may be `mathjax-node-png`?) and separating js from lua 
- [ ] exposing mathjax options through lua
- [ ] proper `neorg` integration
- [ ]





## rough notes


  https://www.reddit.com/r/neovim/comments/10s3nmn/math_zone_detection_for_luasnip/
  https://sw.kovidgoyal.net/kitty/graphics-protocol/

  convert svg to png with js
  https://github.com/yisibl/resvg-js


```
  rsvg-convert a.svg | kitty +kitten icat
```

https://github.com/KaTeX/KaTeX/
https://github.com/KaTeX/KaTeX/pull/251
https://github.com/Automattic/node-canvas
https://github.com/CurriculumAssociates/canvas-latex
