---
layout: post
title: Introduction to LaTex
categories:
  - LaTex
tags:
  - introduction
  - LaTex
  - tutorial
draft: false
id: 94
date: 2013-04-18 10:37:00
permalink:
description:
cover_img:
toc-disable:
comments:
---

### &#91;This introduction is given by David Reid&#93;

### Why is LATEX great for technical docs?

1.  Separate content from style.
2.  Good layout (usually).
3.  Excellent for managing references (including gure numbers)

### LATEX basics: Commands and Environments

Uses commands to do something special：

> format: \commandname[optional_args]{required_args}

Uses environments to treat sections specially：

> format: \ begin{environment} ... \ end{environment}

### Structure of a LATEX document

Preamble

> Collection of commands that specify global processing parameters

Body

> Actual text mixed with LATEX commands.

### What goes in the preamble?

The first is:

> \documentclass[options]{class}
> 
>   its options:
> 
> > font size (10pt,12pt, etc.)
> > 
> >     page format (onecolumn, twocolumn)
> 
>   its class choices:
> 
> > book, article, letter (others: gatech-thesis, ieeetran)

The second is:

> Title and Author information (these are like global variables)

### Some Notes as input in Body

1.  paragraphs (need blank line between each paragraph)
2.  quotation marks (use tick mark for leading quote marks)
3.  percent sign - a reserved character (replace with \%)

### Section headers

\section{Section Title}

\label{yourlabel}

use the following conventions for labels:

> figures: fig:name
>   tables: tab:name
>   sections: sec:name

And you can reference it in the text with

> \ref{sec:origins} .

### Math in LATEX

The math engine in LATEX is extremely powerful

Equations are build using a markup language

Two ways to add math:

1  Inline:

> $ type equation here $

2  Equation environment:

> \begin{equation} type equation here
>   \end{equation}

You can use AMS-MATH LATEX package to for more symbols

> \usepackage{amsmath}

### Important things to know as using math in LaTex

Subscripts:

> var_{subscript}

Superscripts:

> var^{superscript}

Fractions:

> \frac{num}{denom}

Greek letters:

> \lettername or \Lettername

Reference Book is [here](ftp://ftp.ams.org/pub/tex/doc/amsmath/short-math-guide.pdf)

### Adding graphics to the document

1.  You can use a LATEX package to import graphics from external programs
2.  Called graphicx
3.  File types:
 >>A. LATEX: .eps
 >>B. PDFLATEX: .pdf, .png, .jpg

### Important things to know as Adding graphics in LaTex

1.  Add the figure
 A. Import the package in the preamble:
      \usepackage{graphicx}
 B. Setup the gure environment:
      \begin{figure} ...  end{figure}
 C. Add the gure:      \includegraphics{buzz.jpg}
 D. Compile
2.  Adjust the figure
 A. Optional arguments: \includegraphics[key=value]{buzz.jpg}
      scale = number
      height = number, width = number
      angle = number
      plus more
 B. Try one: \includegraphics[scale=0.5]{buzz.jpg}
 C. Center Buzz: add the command \centering to the environment
3.  Place figure
 A. Optional arguments: \begin{figure}[where]
       ht: here (as close to here as possible)
       t: top
       b: bottom
       p: on its own page or column
 B. We can make the gure span two columns by changing    \ begin{figure} and \ end{figure} to    \ begin{figure_} and \ end{figure_}
4.  Captions
 A. Simple: \caption{text}
 B. You can use any LATEX commands in the caption.
 C. Try it: \caption{This is buzz. Unlike Hairy Dawg, he knows $\pi \neq 3$.}
5.  Labeling
 A. Works just like labeling sections
 B. \label{yourlabel}
 C. Try it: \label{fig:buzz}
 D. And you can reference it in the text with \ ref{fig:buzz} .
 E. And you can create a list of gures with \listoffigures !
6.  How to create figures
 A. Vector or Raster?
 B. Ways to generate vector images
 Export .eps from Matlab, Mathematica, etc.
       Corel Draw
       Adobe Illustrator
       Inkscape (free)
       [maa](http://www.maa.org/editorial/mathgames/...mathgames_08_01_05.html)
       Convert vector graphics to pdf with Acrobat

### References in LATEX

1.  LATEX is great for documents with references
2.  We will use BibTeX to manage references
3.  BibTeX requires two things to work:
 > Commands in the source file
 > Bibliography (.bib) file
4.  Commands in the source file
 To the body, add: > \bibliographystyle{plain}
 Choices: plain, unsrt, abbrv
 > \bibliography{mybib}
 mybib.bib is the bibliography file
5.  Bibliography file
 A. A database of all your references
 B. Can be reused for other documents!
 C. Open mybib.bib for examples
 D. Open bibtextemplates.txt for examples
6.  Citing a reference
 Similar to referencing a label
 > \cite{Clough:2004}

### More resources

1.  [www.prism.gatech.edu/_gte449i/latex/](www.prism.gatech.edu/_gte449i/latex/)
2.  Tons of information on the web
3.  Many good books available
 Kopka and Daly, "A Guide to LATEX"