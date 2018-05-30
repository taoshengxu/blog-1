/**
 * Copyright 2016 Google Inc. All rights reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
*/

// DO NOT EDIT THIS GENERATED OUTPUT DIRECTLY!
// This file should be overwritten as part of your build process.
// If you need to extend the behavior of the generated service worker, the best approach is to write
// additional code and include it using the importScripts option:
//   https://github.com/GoogleChrome/sw-precache#importscripts-arraystring
//
// Alternatively, it's possible to make changes to the underlying template file and then use that as the
// new base for generating output, via the templateFilePath option:
//   https://github.com/GoogleChrome/sw-precache#templatefilepath-string
//
// If you go that route, make sure that whenever you update your sw-precache dependency, you reconcile any
// changes made to this original template file with your modified copy.

// This generated service worker JavaScript will precache your site's resources.
// The code needs to be saved in a .js file at the top-level of your site, and registered
// from your pages in order to be used. See
// https://github.com/googlechrome/sw-precache/blob/master/demo/app/js/service-worker-registration.js
// for an example of how you can register this script and handle various service worker events.

/* eslint-env worker, serviceworker */
/* eslint-disable indent, no-unused-vars, no-multiple-empty-lines, max-nested-callbacks, space-before-function-paren, quotes, comma-spacing */
'use strict';

var precacheConfig = [["C:/DATA/Git/blog/public/AR+V-SLAM的学习资料汇总/index.html","020b9f39bfa7b9e47459649c375e12b2"],["C:/DATA/Git/blog/public/HistCite介绍/index.html","5b0f8fdb52f0eb1456288d692016cf06"],["C:/DATA/Git/blog/public/LSH那些事儿1/index.html","decc2e84e5710a6650b634be2a66acd2"],["C:/DATA/Git/blog/public/LSH那些事儿1/lsh-example.png","3a705be6c40fc5ea3bafa1d575fcaf56"],["C:/DATA/Git/blog/public/LSH那些事儿2/201203141042366430.png","5a1eee56b058584c4e74252cfff47c5a"],["C:/DATA/Git/blog/public/LSH那些事儿2/201203141042388707.png","5378d905a4c8bfeb199beb83d81c7c85"],["C:/DATA/Git/blog/public/LSH那些事儿2/201203141042424690.png","9ff259df3e22c44467e6fe97ff9fbf09"],["C:/DATA/Git/blog/public/LSH那些事儿2/index.html","b97bb078a7732a3fa03594d3fb621b82"],["C:/DATA/Git/blog/public/LSH那些事儿3/15144243_L3JA.png","ccab09a2f98f20df2b48f3f297568002"],["C:/DATA/Git/blog/public/LSH那些事儿3/index.html","7ebafec81c0de852dfd08670f8e2a9c5"],["C:/DATA/Git/blog/public/LSH那些事儿4/index.html","4102c0c06ee9d4c463f0e9b952991ce6"],["C:/DATA/Git/blog/public/Latex书写误区/index.html","ff137ba9518da147b30f89b99eee0190"],["C:/DATA/Git/blog/public/OpenWRT学习随录1/index.html","71777a98563c5144c58338ed82d1943d"],["C:/DATA/Git/blog/public/OpenWRT学习随录2/index.html","e9f9998d2ec156f3610b33a4038ae777"],["C:/DATA/Git/blog/public/OpenWRT学习随录3/index.html","e6f31705c328345d2852933087ff8082"],["C:/DATA/Git/blog/public/OpenWRT学习随录4/index.html","b53d4872c914696fa4a0cb18b52e911f"],["C:/DATA/Git/blog/public/archives/2009/index.html","c93803e17a71fa582b7cf5a78ecc6bf9"],["C:/DATA/Git/blog/public/archives/2013/index.html","b24e9bb0d7c0844d911860f96a8222ea"],["C:/DATA/Git/blog/public/archives/2013/page/2/index.html","25b755bdda162f8a2a0b179943135ce1"],["C:/DATA/Git/blog/public/archives/2014/index.html","28b12b662ae3b04a09f2f526c4925a54"],["C:/DATA/Git/blog/public/archives/2014/page/2/index.html","d121028a7afa8d1f2c7ad02560fc5175"],["C:/DATA/Git/blog/public/archives/2015/index.html","9c8a91cdb8a99ecef514233cd58632a8"],["C:/DATA/Git/blog/public/archives/2015/page/2/index.html","193be3ec1b460510c274a9c66ddb4b5b"],["C:/DATA/Git/blog/public/archives/2016/index.html","90f1049cd30b74da0b73b8099c659f73"],["C:/DATA/Git/blog/public/archives/2017/index.html","24351e1abcca9730958a94b36e482e0b"],["C:/DATA/Git/blog/public/archives/2018/index.html","9cb7ca87a70da9e33ca01bf9ad32d040"],["C:/DATA/Git/blog/public/archives/2018/page/2/index.html","ae82e299a53f7a8598a5b84e8fcab419"],["C:/DATA/Git/blog/public/archives/index.html","39706f450038aa39f1c199ef8ae9cefa"],["C:/DATA/Git/blog/public/archives/page/2/index.html","31a8f5a0780ec02c35def59712d922f7"],["C:/DATA/Git/blog/public/archives/page/3/index.html","8936afc4308d290207d8a244e5f0fd99"],["C:/DATA/Git/blog/public/archives/page/4/index.html","e496f4325e23933ec4a0e3a28b41d2ca"],["C:/DATA/Git/blog/public/archives/page/5/index.html","81dd79aa3feb2f7cc2e7c4dc8a07cd49"],["C:/DATA/Git/blog/public/archives/page/6/index.html","1c00151c3a035c1df1d1d0e7889148db"],["C:/DATA/Git/blog/public/archives/page/7/index.html","945ef8f2d167b906863d4fce1cf73f95"],["C:/DATA/Git/blog/public/categories/index.html","6cb62d6c313b41d91650ca20db860882"],["C:/DATA/Git/blog/public/columns/index.html","e8a9cf4ab842dbbc2f94e7a084293e00"],["C:/DATA/Git/blog/public/css/bootstrap.min.css","f00e478ab660a60074cd60209327ec7a"],["C:/DATA/Git/blog/public/css/highlight.css","c29257837937d5ec905564fca53ab4b2"],["C:/DATA/Git/blog/public/css/main.css","9f19ecfbc255c6bed22acf163b11af2b"],["C:/DATA/Git/blog/public/css/prism-line-numbers.css","13e8f68a5dd53a8c569dbaf34f958d1e"],["C:/DATA/Git/blog/public/css/prism-solarizedlight.css","b1796d4bce7280705f85221c69c60c17"],["C:/DATA/Git/blog/public/img/banner.png","63d59053934c8d945ffaecf190103c3f"],["C:/DATA/Git/blog/public/img/northernlights-sisimiut-lake.jpg","d1895becc3697902e9dc142024fbd346"],["C:/DATA/Git/blog/public/img/rockrms.png","60a21af36ed98168a74d8a6d0dfc1bcb"],["C:/DATA/Git/blog/public/index.html","440271b6a95517a502db491c27203ec9"],["C:/DATA/Git/blog/public/install-python-numpy-scipy-and-matplotlib-on-mac-os-x/index.html","23b09c346a669a07002124bad225cef4"],["C:/DATA/Git/blog/public/introduction-to-latex/index.html","a9928cbbfdf9e28e159b952b3f8e223c"],["C:/DATA/Git/blog/public/js/jquery.js","69a17e7e6b1da2eb04678491e47f82ac"],["C:/DATA/Git/blog/public/js/jquery.tagcloud.js","b1648ba28f9056bd3dfc8aae6f583425"],["C:/DATA/Git/blog/public/js/main.js","384c9841f827fdcc6cdf5a045baaf8e4"],["C:/DATA/Git/blog/public/js/search.js","0b56aa8eb4f5635d7df2bc971bf36d56"],["C:/DATA/Git/blog/public/js/tagcanvas.js","222f58419252597da4e4b17828824a8f"],["C:/DATA/Git/blog/public/js/tagcloud.js","7dc7796a280ab49d353c112275f52d81"],["C:/DATA/Git/blog/public/js/totop.js","dea26738a8bb515c46e115590c768405"],["C:/DATA/Git/blog/public/page/2/index.html","e1555f99b6f8e968ecb9f723770c9b21"],["C:/DATA/Git/blog/public/page/3/index.html","3788d7e5be052f8f8d85165247268a8c"],["C:/DATA/Git/blog/public/page/4/index.html","22ff43ec27192797dfef3d7a67743240"],["C:/DATA/Git/blog/public/page/5/index.html","aa3c314fc96c46667aee8fca5c6d8484"],["C:/DATA/Git/blog/public/page/6/index.html","2ae89ba403073776ebf1d39f27d6fa9b"],["C:/DATA/Git/blog/public/post_cover_images/Aalborg.jpg","3c36b37510ea68da16307091ae9dd8e2"],["C:/DATA/Git/blog/public/post_cover_images/bayes_avator.png","db081a16f66b88969d116b769f7f926f"],["C:/DATA/Git/blog/public/post_cover_images/drops.jpg","6cd1a9f72f9a6bc37858608a3724b041"],["C:/DATA/Git/blog/public/post_cover_images/firenze.png","102770d0ba1f6686ac3ec2a97df40588"],["C:/DATA/Git/blog/public/post_cover_images/kalman.png","da265096d2256bafc34038b338d601b2"],["C:/DATA/Git/blog/public/post_cover_images/moon.jpg","a45ed41ce311a7d0d23205a19b0677fb"],["C:/DATA/Git/blog/public/tags/index.html","905d3cbcd2fddde65261dc12b9e07a67"],["C:/DATA/Git/blog/public/the-milestone-2018/index.html","833e4abea824f086373ef381cd4be536"],["C:/DATA/Git/blog/public/the-milestone-2018/index/old_blog.png","6d3289b00b501bab3a9ad5c09f34a7ff"],["C:/DATA/Git/blog/public/trips/index.html","e04200b91671acb1735b0b86860dd412"],["C:/DATA/Git/blog/public/vita/index.html","ebdbe779e2c378bd6c4dc6af6fb2877d"],["C:/DATA/Git/blog/public/动态贝叶斯网络/dbn.jpg","01ea1061f73b8529248002a82266fae2"],["C:/DATA/Git/blog/public/动态贝叶斯网络/dbn_inference.png","0c434e5c9b359e82f2e6da255cb477f4"],["C:/DATA/Git/blog/public/动态贝叶斯网络/dbn_time_slice.png","ff1cc5606b837fe0a70ceb869cc65acd"],["C:/DATA/Git/blog/public/动态贝叶斯网络/index.html","6395d2b4c2db03e2e198c0c86773e555"],["C:/DATA/Git/blog/public/动态贝叶斯网络进阶/dn-dn.png","8f0b79e80408d10f14c54171e2d4fd68"],["C:/DATA/Git/blog/public/动态贝叶斯网络进阶/dn-tn.png","1eea6235f869258368b7e2740f4f032f"],["C:/DATA/Git/blog/public/动态贝叶斯网络进阶/em_dbn.png","8b4788b660ef8a6125ec066e6ea70283"],["C:/DATA/Git/blog/public/动态贝叶斯网络进阶/index.html","b1f2184b09c56e5fb3bc1bff9f99f23a"],["C:/DATA/Git/blog/public/动态贝叶斯网络进阶/prior_and_transition_networks.png","09430f1b662535f6a23bb4ff7b9fc04e"],["C:/DATA/Git/blog/public/动态贝叶斯网络进阶/sn-dn.png","8e97a841545fbc49e177881aa2bc120c"],["C:/DATA/Git/blog/public/动态贝叶斯网络进阶/temporally_invariant_networks.png","f23d8c5b7554b18277eb55d7c7f40f3b"],["C:/DATA/Git/blog/public/动态贝叶斯网络进阶/temporally_variant_networks.png","1fc45090b243fe221bd036de800ce936"],["C:/DATA/Git/blog/public/博士论文致谢/index.html","e930f400332bb9745e4134deb88ec39b"],["C:/DATA/Git/blog/public/卡尔曼滤波/index.html","8d4fd4cf0532084320b1da53f128b865"],["C:/DATA/Git/blog/public/卡尔曼滤波/kalman_filter_model.png","5a5294874707578813353448a634119d"],["C:/DATA/Git/blog/public/变分推断介绍/index.html","fb10b378427d795d4983ec6122e099fe"],["C:/DATA/Git/blog/public/变分推断介绍/vi_example.jpg","3d559b1e6176c574cb3f28d318df6740"],["C:/DATA/Git/blog/public/变分推断介绍/vi_optimization.jpg","1890a3a92d616d8fbde5e1b5368581c7"],["C:/DATA/Git/blog/public/因子图介绍/crf.png","c03c584efde12ac5911c05e357b35ada"],["C:/DATA/Git/blog/public/因子图介绍/dgm.png","a8a9a3e13e4b3ea05004b71c5e8a4833"],["C:/DATA/Git/blog/public/因子图介绍/factor_graph_example.png","fdfc2f5b4e316677d192cf2bcd16cf63"],["C:/DATA/Git/blog/public/因子图介绍/factor_graph_example_variant.png","4b3163c4e5e58eafd02da059fe150c84"],["C:/DATA/Git/blog/public/因子图介绍/factor_graph_ugm.png","b14252cc69e6797db688ba4a5dd9153b"],["C:/DATA/Git/blog/public/因子图介绍/hmm.png","2c590892d54ff471deecc57375abe4a7"],["C:/DATA/Git/blog/public/因子图介绍/index.html","c782128329361796b345edce1ae1d470"],["C:/DATA/Git/blog/public/因子图介绍/loop_in_dgm.png","c3712fb563dfb1ab0e19d2b97b56c2f5"],["C:/DATA/Git/blog/public/因子图介绍/loop_in_dgm_factor_graph.png","f81be32cd16ce321aa211c3425d390f6"],["C:/DATA/Git/blog/public/因子图介绍/markov-chain.png","71258c6eb9467aa8cc994527bbf8ae08"],["C:/DATA/Git/blog/public/因子图介绍/method_1.png","c6a3a33394bdb00f5c6857a01bb0546c"],["C:/DATA/Git/blog/public/因子图介绍/sum_product_1.png","3bf227f8118eab25104da2c1ed9b7f3c"],["C:/DATA/Git/blog/public/因子图介绍/sum_product_2.png","1b6b31074a5aea7d4cf04726e531043f"],["C:/DATA/Git/blog/public/因子图介绍/sum_product_3.png","a02b9c8bd4ae6e828dda29863c2bc7fe"],["C:/DATA/Git/blog/public/因子图介绍/sum_product_4.png","8676a35cf910e018be7ecf1cbc1f84d1"],["C:/DATA/Git/blog/public/因子图介绍/sum_product_algorithm.png","e315d33ce0f63eb907ace8e88d16465a"],["C:/DATA/Git/blog/public/因子图介绍/sum_product_equation_1.png","d8751bb52e328bdb50fc884a8a348215"],["C:/DATA/Git/blog/public/因子图介绍/sum_product_equation_2.png","549d0044f49c080799e4eedca48269bb"],["C:/DATA/Git/blog/public/因子图介绍/sum_product_equation_3.png","91690705f32f64489dbe1c05d5416f25"],["C:/DATA/Git/blog/public/因子图介绍/ugm.png","b1b3215a90d8eb9abdd44683c583231d"],["C:/DATA/Git/blog/public/大嘴李和童话镇1/20140910_112105_IMG_1979-2.jpg","047a356b88ab77899b474d8c0a80f0b0"],["C:/DATA/Git/blog/public/大嘴李和童话镇1/20140911_133811_IMG_1992.jpg","5c219b352e5c230e3e58ef6f6300f090"],["C:/DATA/Git/blog/public/大嘴李和童话镇1/20140912_141310_IMG_2002.jpg","c7feafd402375b3465b76ddcd5c52265"],["C:/DATA/Git/blog/public/大嘴李和童话镇1/20140912_141318_IMG_2003.jpg","c480b4f0bb87b3beb2e32a5da2b3439d"],["C:/DATA/Git/blog/public/大嘴李和童话镇1/index.html","ffeffd38622e7e0e4441deb8d1ef7ad2"],["C:/DATA/Git/blog/public/大嘴李和童话镇2/1.jpg","aff8f4e0edf478cfd759f7cb6cf5ada7"],["C:/DATA/Git/blog/public/大嘴李和童话镇2/11030518046a9a6699b289d053.jpg","4c230b3b468557c342fd99e4277fd097"],["C:/DATA/Git/blog/public/大嘴李和童话镇2/1401591038163p18palb20gsis3sb144db1315kg3.jpg","cd90542b01f3b65c91bf02037bdd6f6d"],["C:/DATA/Git/blog/public/大嘴李和童话镇2/2.jpg","a2e787e2e2427c5218399d345ebb7bfa"],["C:/DATA/Git/blog/public/大嘴李和童话镇2/3.jpg","fa6793464edd7d696324c68584bff880"],["C:/DATA/Git/blog/public/大嘴李和童话镇2/index.html","4a0772a5c08e5fa8ec079144860f7037"],["C:/DATA/Git/blog/public/大嘴李和童话镇3/20140911_133811_IMG_1992.jpg","dba95661d9b52d95e7a2b485a809702a"],["C:/DATA/Git/blog/public/大嘴李和童话镇3/20140912_141310_IMG_2002.jpg","c5326b227ef4355e73a43c8ce012465b"],["C:/DATA/Git/blog/public/大嘴李和童话镇3/20140912_141318_IMG_2003.jpg","ed7facf36e8862ca4ea0121b8eadca5d"],["C:/DATA/Git/blog/public/大嘴李和童话镇3/20140912_145641_IMG_2031.jpg","aeb609b12bb487f35a60cef632fd29d6"],["C:/DATA/Git/blog/public/大嘴李和童话镇3/20141005_101613_IMG_2115.jpg","a5859b81044942ecbdc734fe403e1fe4"],["C:/DATA/Git/blog/public/大嘴李和童话镇3/index.html","d80bbe9a279993f10116d4795810698a"],["C:/DATA/Git/blog/public/大嘴李和童话镇4/1.jpg","7d4f4c05928a65d37bc906c68e955e86"],["C:/DATA/Git/blog/public/大嘴李和童话镇4/2.jpg","68b5939dbae434344968cb4bc0aea0a8"],["C:/DATA/Git/blog/public/大嘴李和童话镇4/3.jpg","0dc650dae185586769e1aa1151486c06"],["C:/DATA/Git/blog/public/大嘴李和童话镇4/copenhagen-denmark-shopping-carks.jpg","3737b1f0fd7b9a47537fac5ae15e325c"],["C:/DATA/Git/blog/public/大嘴李和童话镇4/fotex.jpg","fb817160d9f3277f15bd13e5f683b6ca"],["C:/DATA/Git/blog/public/大嘴李和童话镇4/index.html","3f2ddcec5d7cf0b174d3d08cc1c629fd"],["C:/DATA/Git/blog/public/大嘴李和童话镇4/netto.png","0c84527e57a1430123de2734a513a5e1"],["C:/DATA/Git/blog/public/大嘴李和童话镇4/supermarket.png","182a37aff13c0cc04d0b9bf9f4501d41"],["C:/DATA/Git/blog/public/大嘴李和童话镇5/20140913_93523_IMG_2009.jpg","f221e6827563e15feb14271fbd22992e"],["C:/DATA/Git/blog/public/大嘴李和童话镇5/ForedEscort.jpg","48c1e1843c91595523c450e4449c1fc2"],["C:/DATA/Git/blog/public/大嘴李和童话镇5/IMG_0236.jpg","d7d6db9117cc3a929e1e950c181eaba2"],["C:/DATA/Git/blog/public/大嘴李和童话镇5/Scandinavia-Standard-Klippekort-Monthly-Pass.jpg","70506e9b8daed561353a5fa38907e2c1"],["C:/DATA/Git/blog/public/大嘴李和童话镇5/cycling-in-Denmark.jpg","4762dca42ae6e48d0d8cb081acb68c3f"],["C:/DATA/Git/blog/public/大嘴李和童话镇5/index.html","68fe728e145731e0212cc5895d2e372c"],["C:/DATA/Git/blog/public/大嘴李和童话镇6/Aalborg_Kommune_Logo.png","2db04274cb8d1d63acb8b5954fa62698"],["C:/DATA/Git/blog/public/大嘴李和童话镇6/Danske-Bank.png","6c0284b5ff80c69311ded25da7b4a3b7"],["C:/DATA/Git/blog/public/大嘴李和童话镇6/NemId.jpg","0928d776ba3c2fea257afe6625f28ba6"],["C:/DATA/Git/blog/public/大嘴李和童话镇6/dankort.jpg","8abbe5ea054b9d3db88afbb2b97cdc56"],["C:/DATA/Git/blog/public/大嘴李和童话镇6/index.html","c530e530ec2b16d288b42f54a954e35a"],["C:/DATA/Git/blog/public/大嘴李和童话镇6/photo.jpg","9138050bd98b05464baf89e6c40ca678"],["C:/DATA/Git/blog/public/大嘴李和童话镇6/workpermit.jpg","0e8cbf9c4e17750a528b05004ea7d9a7"],["C:/DATA/Git/blog/public/数据挖掘十大算法/index.html","fabf21e1e11b36156f3ad75dab5cf693"],["C:/DATA/Git/blog/public/数据挖掘十大算法/top10.png","f02763791cbca775618213fa9e7d0496"],["C:/DATA/Git/blog/public/概率图模型总览/MH-sampling.png","7a851ed472478617994c31087b0ec493"],["C:/DATA/Git/blog/public/概率图模型总览/belief_propagation.png","197ce88937ab62eabe0b2e7a2398456a"],["C:/DATA/Git/blog/public/概率图模型总览/index.html","c8d3f502b505d459f5d04b371c719678"],["C:/DATA/Git/blog/public/概率图模型总览/mind_map.jpg","e7355db7a068817e6ddc6146463d7ee7"],["C:/DATA/Git/blog/public/概率图模型总览/moral.png","c3926415e1a25abda348b0a9b1685480"],["C:/DATA/Git/blog/public/游青城山记/index.html","970e7b27bfcdf0f2cea7872a59a05bda"],["C:/DATA/Git/blog/public/理解垃圾回收机制/index.html","56a8b9efbc1089961bce1833f08577a4"],["C:/DATA/Git/blog/public/相似性度量笔记/index.html","0917fa42cfd33eb8ca87c63284eae42e"],["C:/DATA/Git/blog/public/相似性度量笔记/simhash.png","d22901be82ab033037e802a950e73cf3"],["C:/DATA/Git/blog/public/终极算法读书笔记/index.html","415131651ae5bf54951c4cac551990cb"],["C:/DATA/Git/blog/public/词/index.html","bbf5bc6fbd5536ce4b7e356c0233ebef"],["C:/DATA/Git/blog/public/诗/index.html","b25d6d84db8ef5978499a2da313b2c85"],["C:/DATA/Git/blog/public/谈谈Metric Learning1/index.html","21fba13a697c37a47b13114b4d28da1f"],["C:/DATA/Git/blog/public/谈谈Metric Learning2/index.html","f241326e93c075bd18691c436b6fa5f6"],["C:/DATA/Git/blog/public/谈谈Metric Learning3/index.html","1461b823d29063842352a9a7ef1e8816"],["C:/DATA/Git/blog/public/谈谈Metric Learning4/index.html","448d33c762f5a30b9a39892d98dee78c"],["C:/DATA/Git/blog/public/进程通信IPC/fifo.png","bd0c9bd4c662c5ca3992826ce343514d"],["C:/DATA/Git/blog/public/进程通信IPC/index.html","a4930624f0d9524d0e75512d2241ca7d"],["C:/DATA/Git/blog/public/进程通信IPC/pipe-fork.png","a1f1417c571d04cff3ef72766646ac0c"],["C:/DATA/Git/blog/public/进程通信IPC/pipe.png","e7f80125164cc85128c5e92370c5bb78"],["C:/DATA/Git/blog/public/静态贝叶斯网络/Page14.png","a47736e3dd89b39a64fdb482510ae3a3"],["C:/DATA/Git/blog/public/静态贝叶斯网络/Page15.png","05461f3645375ef98a5336c26d6f7817"],["C:/DATA/Git/blog/public/静态贝叶斯网络/Page16.png","fb35a98dbd75628dab1ade89311a3e73"],["C:/DATA/Git/blog/public/静态贝叶斯网络/Page17.png","20776422f2a2b6bf56465ec6c775ddb2"],["C:/DATA/Git/blog/public/静态贝叶斯网络/Page20.png","d985e603bcfcac22f8b88e79f54b9cf1"],["C:/DATA/Git/blog/public/静态贝叶斯网络/Page21.png","8583cc25a3465d0f7cdfef1aa7825c24"],["C:/DATA/Git/blog/public/静态贝叶斯网络/Page23.png","c14490989bb7c835abab1f54f4a7be51"],["C:/DATA/Git/blog/public/静态贝叶斯网络/Page41.png","f239bce0ed8d7e3bc7283abd971086c8"],["C:/DATA/Git/blog/public/静态贝叶斯网络/Page42.png","a0b496ecb622b8ef11fed2b943718791"],["C:/DATA/Git/blog/public/静态贝叶斯网络/d-separation.png","248de73d9355c6f4cd487668758ff50d"],["C:/DATA/Git/blog/public/静态贝叶斯网络/index.html","05180456693f889ff3b975689c02fe58"],["C:/DATA/Git/blog/public/静态贝叶斯网络/watermelon_fig_7.5.png","2c0a53fd404b8ca0a81fbbcd26bc8b57"]];
var cacheName = 'sw-precache-v3--' + (self.registration ? self.registration.scope : '');


var ignoreUrlParametersMatching = [/^utm_/];



var addDirectoryIndex = function (originalUrl, index) {
    var url = new URL(originalUrl);
    if (url.pathname.slice(-1) === '/') {
      url.pathname += index;
    }
    return url.toString();
  };

var cleanResponse = function (originalResponse) {
    // If this is not a redirected response, then we don't have to do anything.
    if (!originalResponse.redirected) {
      return Promise.resolve(originalResponse);
    }

    // Firefox 50 and below doesn't support the Response.body stream, so we may
    // need to read the entire body to memory as a Blob.
    var bodyPromise = 'body' in originalResponse ?
      Promise.resolve(originalResponse.body) :
      originalResponse.blob();

    return bodyPromise.then(function(body) {
      // new Response() is happy when passed either a stream or a Blob.
      return new Response(body, {
        headers: originalResponse.headers,
        status: originalResponse.status,
        statusText: originalResponse.statusText
      });
    });
  };

var createCacheKey = function (originalUrl, paramName, paramValue,
                           dontCacheBustUrlsMatching) {
    // Create a new URL object to avoid modifying originalUrl.
    var url = new URL(originalUrl);

    // If dontCacheBustUrlsMatching is not set, or if we don't have a match,
    // then add in the extra cache-busting URL parameter.
    if (!dontCacheBustUrlsMatching ||
        !(url.pathname.match(dontCacheBustUrlsMatching))) {
      url.search += (url.search ? '&' : '') +
        encodeURIComponent(paramName) + '=' + encodeURIComponent(paramValue);
    }

    return url.toString();
  };

var isPathWhitelisted = function (whitelist, absoluteUrlString) {
    // If the whitelist is empty, then consider all URLs to be whitelisted.
    if (whitelist.length === 0) {
      return true;
    }

    // Otherwise compare each path regex to the path of the URL passed in.
    var path = (new URL(absoluteUrlString)).pathname;
    return whitelist.some(function(whitelistedPathRegex) {
      return path.match(whitelistedPathRegex);
    });
  };

var stripIgnoredUrlParameters = function (originalUrl,
    ignoreUrlParametersMatching) {
    var url = new URL(originalUrl);
    // Remove the hash; see https://github.com/GoogleChrome/sw-precache/issues/290
    url.hash = '';

    url.search = url.search.slice(1) // Exclude initial '?'
      .split('&') // Split into an array of 'key=value' strings
      .map(function(kv) {
        return kv.split('='); // Split each 'key=value' string into a [key, value] array
      })
      .filter(function(kv) {
        return ignoreUrlParametersMatching.every(function(ignoredRegex) {
          return !ignoredRegex.test(kv[0]); // Return true iff the key doesn't match any of the regexes.
        });
      })
      .map(function(kv) {
        return kv.join('='); // Join each [key, value] array into a 'key=value' string
      })
      .join('&'); // Join the array of 'key=value' strings into a string with '&' in between each

    return url.toString();
  };


var hashParamName = '_sw-precache';
var urlsToCacheKeys = new Map(
  precacheConfig.map(function(item) {
    var relativeUrl = item[0];
    var hash = item[1];
    var absoluteUrl = new URL(relativeUrl, self.location);
    var cacheKey = createCacheKey(absoluteUrl, hashParamName, hash, false);
    return [absoluteUrl.toString(), cacheKey];
  })
);

function setOfCachedUrls(cache) {
  return cache.keys().then(function(requests) {
    return requests.map(function(request) {
      return request.url;
    });
  }).then(function(urls) {
    return new Set(urls);
  });
}

self.addEventListener('install', function(event) {
  event.waitUntil(
    caches.open(cacheName).then(function(cache) {
      return setOfCachedUrls(cache).then(function(cachedUrls) {
        return Promise.all(
          Array.from(urlsToCacheKeys.values()).map(function(cacheKey) {
            // If we don't have a key matching url in the cache already, add it.
            if (!cachedUrls.has(cacheKey)) {
              var request = new Request(cacheKey, {credentials: 'same-origin'});
              return fetch(request).then(function(response) {
                // Bail out of installation unless we get back a 200 OK for
                // every request.
                if (!response.ok) {
                  throw new Error('Request for ' + cacheKey + ' returned a ' +
                    'response with status ' + response.status);
                }

                return cleanResponse(response).then(function(responseToCache) {
                  return cache.put(cacheKey, responseToCache);
                });
              });
            }
          })
        );
      });
    }).then(function() {
      
      // Force the SW to transition from installing -> active state
      return self.skipWaiting();
      
    })
  );
});

self.addEventListener('activate', function(event) {
  var setOfExpectedUrls = new Set(urlsToCacheKeys.values());

  event.waitUntil(
    caches.open(cacheName).then(function(cache) {
      return cache.keys().then(function(existingRequests) {
        return Promise.all(
          existingRequests.map(function(existingRequest) {
            if (!setOfExpectedUrls.has(existingRequest.url)) {
              return cache.delete(existingRequest);
            }
          })
        );
      });
    }).then(function() {
      
      return self.clients.claim();
      
    })
  );
});


self.addEventListener('fetch', function(event) {
  if (event.request.method === 'GET') {
    // Should we call event.respondWith() inside this fetch event handler?
    // This needs to be determined synchronously, which will give other fetch
    // handlers a chance to handle the request if need be.
    var shouldRespond;

    // First, remove all the ignored parameters and hash fragment, and see if we
    // have that URL in our cache. If so, great! shouldRespond will be true.
    var url = stripIgnoredUrlParameters(event.request.url, ignoreUrlParametersMatching);
    shouldRespond = urlsToCacheKeys.has(url);

    // If shouldRespond is false, check again, this time with 'index.html'
    // (or whatever the directoryIndex option is set to) at the end.
    var directoryIndex = 'index.html';
    if (!shouldRespond && directoryIndex) {
      url = addDirectoryIndex(url, directoryIndex);
      shouldRespond = urlsToCacheKeys.has(url);
    }

    // If shouldRespond is still false, check to see if this is a navigation
    // request, and if so, whether the URL matches navigateFallbackWhitelist.
    var navigateFallback = '';
    if (!shouldRespond &&
        navigateFallback &&
        (event.request.mode === 'navigate') &&
        isPathWhitelisted([], event.request.url)) {
      url = new URL(navigateFallback, self.location).toString();
      shouldRespond = urlsToCacheKeys.has(url);
    }

    // If shouldRespond was set to true at any point, then call
    // event.respondWith(), using the appropriate cache key.
    if (shouldRespond) {
      event.respondWith(
        caches.open(cacheName).then(function(cache) {
          return cache.match(urlsToCacheKeys.get(url)).then(function(response) {
            if (response) {
              return response;
            }
            throw Error('The cached response that was expected is missing.');
          });
        }).catch(function(e) {
          // Fall back to just fetch()ing the request if some unexpected error
          // prevented the cached response from being valid.
          console.warn('Couldn\'t serve response for "%s" from cache: %O', event.request.url, e);
          return fetch(event.request);
        })
      );
    }
  }
});







