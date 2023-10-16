import{_ as o,z as i,A as r,Y as n,C as s,U as e,a6 as t,Q as p}from"./framework-91b4a4fe.js";const l={},c=t('<h1 id="getting-started" tabindex="-1"><a class="header-anchor" href="#getting-started" aria-hidden="true">#</a> Getting Started</h1><div class="custom-container warning"><p class="custom-container-title">WARNING</p><p>VueJS Tour is written for Vue 3. There are no plans to support Vue 2.x</p></div><h2 id="prerequisites" tabindex="-1"><a class="header-anchor" href="#prerequisites" aria-hidden="true">#</a> Prerequisites</h2>',3),u={href:"https://nodejs.org/",target:"_blank",rel:"noopener noreferrer"},d={href:"https://vuejs.org/guide/introduction.html#composition-api",target:"_blank",rel:"noopener noreferrer"},h=t(`<h2 id="installation" tabindex="-1"><a class="header-anchor" href="#installation" aria-hidden="true">#</a> Installation</h2><p>This section will guide you through the process of installing VueJS Tour.</p><ul><li>Step 1: Go to your project directory and install VueJS Tour using npm:</li></ul><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token builtin class-name">cd</span> my-project
<span class="token function">npm</span> <span class="token function">install</span> @globalhive/vuejs-tour
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><ul><li>Step 2: Import the plugin in your application entry point (typically <code>main.js</code>):</li></ul><div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code><span class="token keyword">import</span> <span class="token punctuation">{</span> createApp <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">&quot;vue&quot;</span><span class="token punctuation">;</span>
<span class="token keyword">import</span> App <span class="token keyword">from</span> <span class="token string">&quot;./App.vue&quot;</span><span class="token punctuation">;</span>
<span class="token keyword">import</span> VueJsTour <span class="token keyword">from</span> <span class="token string">&#39;@globalhive/vuejs-tour&#39;</span><span class="token punctuation">;</span>
<span class="token keyword">import</span> <span class="token string">&#39;@globalhive/vuejs-tour/dist/style.css&#39;</span><span class="token punctuation">;</span>

<span class="token keyword">const</span> app <span class="token operator">=</span> <span class="token function">createApp</span><span class="token punctuation">(</span>App<span class="token punctuation">)</span>
  <span class="token punctuation">.</span><span class="token function">use</span><span class="token punctuation">(</span>VueJsTour<span class="token punctuation">)</span>
  <span class="token punctuation">.</span><span class="token function">mount</span><span class="token punctuation">(</span><span class="token string">&quot;#app&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,6),k={href:"https://globalhive.github.io/vuejs-tour/guide/create-a-tour.html",target:"_blank",rel:"noopener noreferrer"};function v(m,g){const a=p("ExternalLinkIcon");return i(),r("div",null,[c,n("ul",null,[n("li",null,[n("a",u,[s("Node.js"),e(a)])]),n("li",null,[n("a",d,[s("Vue 3"),e(a)])])]),h,n("p",null,[s("Everything is ready! Now you can use VueJS Tour in your application. Next, learn how to "),n("a",k,[s("create a tour"),e(a)]),s(".")])])}const _=o(l,[["render",v],["__file","getting-started.html.vue"]]);export{_ as default};