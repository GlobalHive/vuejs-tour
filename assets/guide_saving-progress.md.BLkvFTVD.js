import{_ as s,c as i,o as a,a1 as e}from"./chunks/framework.C8TadXOe.js";const c=JSON.parse('{"title":"Saving Progress","description":"","frontmatter":{},"headers":[],"relativePath":"guide/saving-progress.md","filePath":"guide/saving-progress.md"}'),t={name:"guide/saving-progress.md"},h=e(`<h1 id="saving-progress" tabindex="-1">Saving Progress <a class="header-anchor" href="#saving-progress" aria-label="Permalink to &quot;Saving Progress&quot;">​</a></h1><p>You can save the progress of the tour in the local storage of the browser. This way, the user can continue the tour from where they left off.</p><h2 id="using-the-savetolacalstorage-prop" tabindex="-1">Using the <code>saveToLacalStorage</code> prop <a class="header-anchor" href="#using-the-savetolacalstorage-prop" aria-label="Permalink to &quot;Using the \`saveToLacalStorage\` prop&quot;">​</a></h2><p>To save the progress of the tour, you can use the <code>saveToLocalStorage</code> prop in the <code>VTour</code> component. This prop accepts a string value of <code>never</code>, <code>step</code> or <code>end</code>.</p><div class="language-vue vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">vue</span><pre class="shiki shiki-themes github-light github-dark has-diff vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">&lt;</span><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">script</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> setup</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> lang</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">=</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&#39;ts&#39;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">&gt;</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">    // ...</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">    const</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> steps</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> =</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> [</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">...</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">];</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">&lt;/</span><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">script</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">&gt;</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">&lt;</span><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">template</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">&gt;</span></span>
<span class="line diff remove"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">  &lt;</span><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">VTour</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> :</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">steps</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">=</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">steps</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> autoStart</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> :</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">margin</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">=</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">0</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">/&gt;</span></span>
<span class="line diff add"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">  &lt;</span><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">VTour</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> :</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">steps</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">=</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">steps</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> autoStart</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> saveToLocalStorage</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">=</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&#39;step&#39;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">/&gt;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">  ...</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">&lt;/</span><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">template</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">&gt;</span></span></code></pre></div><h3 id="never" tabindex="-1"><code>never</code> <a class="header-anchor" href="#never" aria-label="Permalink to &quot;\`never\`&quot;">​</a></h3><p><u>No progress will be saved.</u> Even if the user has already completed the tour, it will start from the beginning. Which means that you are responsible for managing the progress of the tour.</p><h3 id="step" tabindex="-1"><code>step</code> <a class="header-anchor" href="#step" aria-label="Permalink to &quot;\`step\`&quot;">​</a></h3><p>The progress of the tour will be saved after each step. So, if the user has completed the first 3 steps and exits, the next time they open the browser, the tour will start from where they left off.</p><h3 id="end" tabindex="-1"><code>end</code> <a class="header-anchor" href="#end" aria-label="Permalink to &quot;\`end\`&quot;">​</a></h3><p>The progress of the tour will be saved only after the user has completed the tour. If the user exits the tour before completing it, the next time they open the browser, the tour will start from the beginning.</p><div class="info custom-block"><p class="custom-block-title">INFO</p><p>This is the default value of the <code>saveToLocalStorage</code> prop.</p></div>`,12),n=[h];function l(p,r,o,k,d,E){return a(),i("div",null,n)}const u=s(t,[["render",l]]);export{c as __pageData,u as default};