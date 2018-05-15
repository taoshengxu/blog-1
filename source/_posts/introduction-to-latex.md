---
layout: post
title: Introduction to Latex
categories:
  - "科研笔记"
tags:
  - "Latex"
  - "教程"
draft: false
id: 94
date: 2013-04-18 10:37:00
cover_img: /blog/post_cover_images/firenze.png
cover_img_from_root: true
permalink:
description:
comments:
---

> This introduction is given by David Reid

### Why is LATEX great for technical docs?

* Separate content from style.
* Good layout (usually).
* Excellent for managing references (including gure numbers).

### LATEX basics: Commands and Environments

Uses commands to do something special：

```latex
\commandname[optional_args]{required_args}
```

Uses environments to treat sections specially：

```latex
\ begin{environment} ... \ end{environment}
```

### Structure of a LATEX document

* Preamble
    * Collection of commands that specify global processing parameters
* Body
    * Actual text mixed with LATEX commands.

### What goes in the preamble?

The first is:
```latex
\documentclass[options]{class}
```
* its options:
    * font size (10pt,12pt, etc.)
    * page format (onecolumn, twocolumn)
* its class choices:
    * book, article, letter (others: gatech-thesis, ieeetran)

The second is:
* Title and Author information (these are like global variables)

### Some Notes as input in Body

1.  paragraphs (need blank line between each paragraph)
2.  quotation marks (use tick mark for leading quote marks)
3.  percent sign - a reserved character (replace with \%)

### Section headers

```latex
\section{Section Title}
```

```latex
\label{yourlabel}
```

use the following conventions for labels:

>   figures = fig:name
>   tables = tab:name
>   sections = sec:name

And you can reference it in the text with

```\latex
\ref{yourlabel}
```

### Math in LATEX

The math engine in LATEX is extremely powerful

Equations are build using a markup language

Two ways to add math:

* Inline:
```latex
$ type equation here $
```

* Equation environment:
```latex
\begin{equation} type equation here \end{equation}
```

You can use AMS-MATH LATEX package to for more symbols

```latex
\usepackage{amsmath}
```

### Important things to know as using math in LaTex

Subscripts:

```latex
var_{subscript}
```

Superscripts:

```latex
var^{superscript}
```

Fractions:

```latex
\frac{num}{denom}
```

Greek letters:

```latex
\lettername or \Lettername
```

Reference Book is [here](ftp://ftp.ams.org/pub/tex/doc/amsmath/short-math-guide.pdf)

### Adding graphics to the document

* You can use a LATEX package to import graphics from external programs
* Called graphicx
* File types:
    * LATEX: .eps
    * PDFLATEX: .pdf, .png, .jpg

### Important things to know as Adding graphics in LaTex

* Add the figure
 * Import the package in the preamble:
      `\usepackage{graphicx}`
 * Setup the gure environment:
      `\begin{figure} ...  end{figure}`
 * Add the gure:
      `\includegraphics{buzz.jpg}`
 * Compile
* Adjust the figure
 * Optional arguments:
      `\includegraphics[key=value]{buzz.jpg}`
      scale = number
      height = number, width = number
      angle = number
      plus more
 * Try one:
      `\includegraphics[scale=0.5]{buzz.jpg}`
 * Center Buzz: add the command `\centering` to the environment
* Place figure
 * Optional arguments: `\begin{figure}[where]`
       ht: here (as close to here as possible)
       t: top
       b: bottom
       p: on its own page or column
 * We can make the gure span two columns by changing `\begin{figure}` and `\end{figure}` to  `\begin{figure}` and `\end{figure}`
* Captions
 * Simple: `\caption{text}`
 * You can use any LATEX commands in the caption.
 * Try it: `\caption{This is buzz. Unlike Hairy Dawg, he knows $\pi \neq 3$.}`
* Labeling
 * Works just like labeling sections
 * `\label{yourlabel}`
 * Try it: `\label{fig:buzz}`
 * And you can reference it in the text with `\ref{fig:buzz}`.
 * And you can create a list of gures with `\listoffigures` !
* How to create figures
 * Vector or Raster?
 * Ways to generate vector images
    * Export .eps from Matlab, Mathematica, etc.
    * Corel Draw
    * Adobe Illustrator
    * Inkscape (free)
    * [maa](http://www.maa.org/)
    * Convert vector graphics to pdf with Acrobat

### References in LATEX

* LATEX is great for documents with references
* We will use BibTeX to manage references
* BibTeX requires two things to work:
 * Commands in the source file
 * Bibliography (.bib) file
* Commands in the source file
 * To the body, add: `\bibliographystyle{plain}`
 * Choices: plain, unsrt, abbrv `\bibliography{mybib}` mybib.bib is the bibliography file
* Bibliography file
 * A database of all your references
 * Can be reused for other documents!
 * Open mybib.bib for examples
 * Open bibtextemplates.txt for examples
* Citing a reference
 * Similar to referencing a label
 `\cite{Clough:2004}`

### More resources

* [www.prism.gatech.edu/_gte449i/latex/](www.prism.gatech.edu/_gte449i/latex/).
* Tons of information on the web.
* Many good books available: Kopka and Daly, "A Guide to LATEX".
