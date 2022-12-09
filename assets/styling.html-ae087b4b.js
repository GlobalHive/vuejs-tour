import{_ as n,z as s,A as a,a6 as t}from"./framework-cb9358d9.js";const p={},e=t(`<h1 id="styling" tabindex="-1"><a class="header-anchor" href="#styling" aria-hidden="true">#</a> Styling</h1><div class="custom-container warning"><p class="custom-container-title">WARNING</p><p>VueJS Tour is written for Vue 3 composition api. There are no plans to support Vue 2.x</p></div><h2 id="sass-scss" tabindex="-1"><a class="header-anchor" href="#sass-scss" aria-hidden="true">#</a> SASS/SCSS</h2><p>VueJS Tour uses <code>scss</code> for styling. You can override the default styles by using the following variables.</p><div class="language-scss" data-ext="scss"><pre class="language-scss"><code><span class="token keyword">@import</span> <span class="token string">&quot;@globalhive/vuejs-tour/src/style/style.scss&quot;</span><span class="token punctuation">;</span>
</code></pre></div><table><thead><tr><th>Variable</th><th>Default</th></tr></thead><tbody><tr><td><code>$vjt__tooltip_color</code></td><td>#fff</td></tr><tr><td><code>$vjt__tooltip_z_index</code></td><td>9999</td></tr><tr><td><code>$vjt__tooltip_font_size</code></td><td>13px</td></tr><tr><td><code>$vjt__tooltip_arrow_size</code></td><td>8px</td></tr><tr><td><code>$vjt__tooltip_background</code></td><td>#333</td></tr><tr><td><code>$vjt__tooltip_border_radius</code></td><td>4px</td></tr><tr><td><code>$vjt__tooltip_max_width</code></td><td>300px</td></tr><tr><td><code>$vjt__highlight_margin</code></td><td>4px</td></tr><tr><td><code>$vjt__highlight_padding</code></td><td>4px</td></tr><tr><td><code>$vjt__highlight_color</code></td><td>#0EA5E9FF</td></tr><tr><td><code>$vjt__highlight_border_radius</code></td><td>4px</td></tr><tr><td><code>$vjt__highlight_border</code></td><td>1px solid #0EA5E9FF</td></tr><tr><td><code>$vjt__action_button_color</code></td><td>#fff</td></tr><tr><td><code>$vjt__action_button_font_size</code></td><td>13px</td></tr><tr><td><code>$vjt__action_button_color_hover</code></td><td>#fff</td></tr><tr><td><code>$vjt__action_button_padding</code></td><td>4px 16px</td></tr><tr><td><code>$vjt__action_button_border_radius</code></td><td>4px</td></tr><tr><td><code>$vjt__action_button_background_hover</code></td><td>#000</td></tr><tr><td><code>$vjt__action_button_border</code></td><td>1px solid #fff</td></tr><tr><td><code>$vjt__action_button_background</code></td><td>transparent</td></tr></tbody></table><div class="custom-container tip"><p class="custom-container-title">TIP</p><p>Override the variables before importing the scss file.<br><u>Don&#39;t import the css file if you are using scss.</u></p></div><h2 id="css" tabindex="-1"><a class="header-anchor" href="#css" aria-hidden="true">#</a> CSS</h2><p>You can also override the default styles by using the following classes.</p><table><thead><tr><th>Class Name</th><th>Description</th></tr></thead><tbody><tr><td><code>#vjt-tooltip</code></td><td>Step container</td></tr><tr><td><code>#vjt-tooltip[data-popper-placement^=top] #vjt-arrow</code></td><td>Step arrow on top</td></tr><tr><td><code>#vjt-tooltip[data-popper-placement^=bottom] #vjt-arrow</code></td><td>Step arrow on bottom</td></tr><tr><td><code>#vjt-tooltip[data-popper-placement^=left] #vjt-arrow</code></td><td>Step arrow at left side</td></tr><tr><td><code>#vjt-tooltip[data-popper-placement^=right] #vjt-arrow</code></td><td>Step arrow at right side</td></tr><tr><td><code>#vjt-arrow</code></td><td>Step arrow</td></tr><tr><td><code>#vjt-arrow:before</code></td><td>Step arrow :before</td></tr><tr><td><code>.vjt-highlight</code></td><td>Highlight style</td></tr><tr><td><code>.vjt-actions</code></td><td>Actions container</td></tr><tr><td><code>.vjt-actions button</code></td><td>Action buttons</td></tr><tr><td><code>.vjt-actions button:hover</code></td><td>Action buttons :hover</td></tr></tbody></table><h2 id="theme" tabindex="-1"><a class="header-anchor" href="#theme" aria-hidden="true">#</a> Theme</h2><p>Or create your own theme and import it instead of the default theme.</p><div class="language-scss line-numbers-mode" data-ext="scss"><pre class="language-scss"><code><span class="token property"><span class="token variable">$vjt__tooltip_color</span></span><span class="token punctuation">:</span> #fff<span class="token punctuation">;</span>
<span class="token property"><span class="token variable">$vjt__tooltip_z_index</span></span><span class="token punctuation">:</span> 9999<span class="token punctuation">;</span>
<span class="token property"><span class="token variable">$vjt__tooltip_font_size</span></span><span class="token punctuation">:</span> 13px<span class="token punctuation">;</span>
<span class="token property"><span class="token variable">$vjt__tooltip_arrow_size</span></span><span class="token punctuation">:</span> 8px<span class="token punctuation">;</span>
<span class="token property"><span class="token variable">$vjt__tooltip_background</span></span><span class="token punctuation">:</span> #333<span class="token punctuation">;</span>
<span class="token property"><span class="token variable">$vjt__tooltip_border_radius</span></span><span class="token punctuation">:</span> 4px<span class="token punctuation">;</span>
<span class="token property"><span class="token variable">$vjt__tooltip_max_width</span></span><span class="token punctuation">:</span> 300px<span class="token punctuation">;</span>

<span class="token property"><span class="token variable">$vjt__highlight_margin</span></span><span class="token punctuation">:</span> 4px<span class="token punctuation">;</span>
<span class="token property"><span class="token variable">$vjt__highlight_padding</span></span><span class="token punctuation">:</span> 4px<span class="token punctuation">;</span>
<span class="token property"><span class="token variable">$vjt__highlight_color</span></span><span class="token punctuation">:</span> #0EA5E9FF<span class="token punctuation">;</span>
<span class="token property"><span class="token variable">$vjt__highlight_border_radius</span></span><span class="token punctuation">:</span> 4px<span class="token punctuation">;</span>
<span class="token property"><span class="token variable">$vjt__highlight_border</span></span><span class="token punctuation">:</span> 1px solid #0EA5E9FF<span class="token punctuation">;</span>

<span class="token property"><span class="token variable">$vjt__action_button_color</span></span><span class="token punctuation">:</span> #fff<span class="token punctuation">;</span>
<span class="token property"><span class="token variable">$vjt__action_button_font_size</span></span><span class="token punctuation">:</span> 13px<span class="token punctuation">;</span>
<span class="token property"><span class="token variable">$vjt__action_button_color_hover</span></span><span class="token punctuation">:</span> #fff<span class="token punctuation">;</span>
<span class="token property"><span class="token variable">$vjt__action_button_padding</span></span><span class="token punctuation">:</span> 4px 16px<span class="token punctuation">;</span>
<span class="token property"><span class="token variable">$vjt__action_button_border_radius</span></span><span class="token punctuation">:</span> 4px<span class="token punctuation">;</span>
<span class="token property"><span class="token variable">$vjt__action_button_background_hover</span></span><span class="token punctuation">:</span> #000<span class="token punctuation">;</span>
<span class="token property"><span class="token variable">$vjt__action_button_border</span></span><span class="token punctuation">:</span> 1px solid #fff<span class="token punctuation">;</span>
<span class="token property"><span class="token variable">$vjt__action_button_background</span></span><span class="token punctuation">:</span> transparent<span class="token punctuation">;</span>

<span class="token selector">[data-hidden] </span><span class="token punctuation">{</span>
  <span class="token property">display</span><span class="token punctuation">:</span> none<span class="token punctuation">;</span>
<span class="token punctuation">}</span>

<span class="token selector">#vjt-tooltip </span><span class="token punctuation">{</span>
  <span class="token property">background-color</span><span class="token punctuation">:</span> <span class="token variable">$vjt__tooltip_background</span><span class="token punctuation">;</span>
  <span class="token property">color</span><span class="token punctuation">:</span> <span class="token variable">$vjt__tooltip_color</span><span class="token punctuation">;</span>
  <span class="token property">padding</span><span class="token punctuation">:</span> 0.5rem<span class="token punctuation">;</span>
  <span class="token property">border-radius</span><span class="token punctuation">:</span> <span class="token variable">$vjt__tooltip_border_radius</span><span class="token punctuation">;</span>
  <span class="token property">font-size</span><span class="token punctuation">:</span> <span class="token variable">$vjt__tooltip_font_size</span><span class="token punctuation">;</span>
  <span class="token property">z-index</span><span class="token punctuation">:</span> <span class="token variable">$vjt__tooltip_z_index</span><span class="token punctuation">;</span>
  <span class="token property">max-width</span><span class="token punctuation">:</span> <span class="token variable">$vjt__tooltip_max_width</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>

<span class="token selector">#vjt-tooltip[data-popper-placement^=&#39;top&#39;] </span><span class="token punctuation">{</span>
  <span class="token selector">#vjt-arrow </span><span class="token punctuation">{</span>
    <span class="token property">bottom</span><span class="token punctuation">:</span> -<span class="token variable">$vjt__tooltip_arrow_size</span>/2<span class="token punctuation">;</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>

<span class="token selector">#vjt-tooltip[data-popper-placement^=&#39;bottom&#39;] </span><span class="token punctuation">{</span>
  <span class="token selector">#vjt-arrow </span><span class="token punctuation">{</span>
    <span class="token property">top</span><span class="token punctuation">:</span> -<span class="token variable">$vjt__tooltip_arrow_size</span>/2<span class="token punctuation">;</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>

<span class="token selector">#vjt-tooltip[data-popper-placement^=&#39;left&#39;] </span><span class="token punctuation">{</span>
  <span class="token selector">#vjt-arrow </span><span class="token punctuation">{</span>
    <span class="token property">right</span><span class="token punctuation">:</span> -<span class="token variable">$vjt__tooltip_arrow_size</span>/2<span class="token punctuation">;</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>

<span class="token selector">#vjt-tooltip[data-popper-placement^=&#39;right&#39;] </span><span class="token punctuation">{</span>
  <span class="token selector">#vjt-arrow </span><span class="token punctuation">{</span>
    <span class="token property">left</span><span class="token punctuation">:</span> -<span class="token variable">$vjt__tooltip_arrow_size</span>/2<span class="token punctuation">;</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>

<span class="token selector">#vjt-arrow </span><span class="token punctuation">{</span>
  <span class="token property">width</span><span class="token punctuation">:</span> <span class="token variable">$vjt__tooltip_arrow_size</span><span class="token punctuation">;</span>
  <span class="token property">height</span><span class="token punctuation">:</span> <span class="token variable">$vjt__tooltip_arrow_size</span><span class="token punctuation">;</span>
  <span class="token property">position</span><span class="token punctuation">:</span> absolute<span class="token punctuation">;</span>
  <span class="token property">z-index</span><span class="token punctuation">:</span> -1<span class="token punctuation">;</span>

  <span class="token selector"><span class="token parent important">&amp;</span>::before </span><span class="token punctuation">{</span>
    <span class="token property">content</span><span class="token punctuation">:</span> <span class="token string">&quot;&quot;</span><span class="token punctuation">;</span>
    <span class="token property">width</span><span class="token punctuation">:</span> <span class="token variable">$vjt__tooltip_arrow_size</span><span class="token punctuation">;</span>
    <span class="token property">height</span><span class="token punctuation">:</span> <span class="token variable">$vjt__tooltip_arrow_size</span><span class="token punctuation">;</span>
    <span class="token property">background-color</span><span class="token punctuation">:</span> <span class="token variable">$vjt__tooltip_background</span><span class="token punctuation">;</span>
    <span class="token property">transform</span><span class="token punctuation">:</span> <span class="token function">rotate</span><span class="token punctuation">(</span>45deg<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token property">position</span><span class="token punctuation">:</span> absolute<span class="token punctuation">;</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>

<span class="token selector">.vjt-highlight </span><span class="token punctuation">{</span>
  <span class="token property">border</span><span class="token punctuation">:</span> <span class="token variable">$vjt__highlight_border</span><span class="token punctuation">;</span>
  <span class="token property">border-radius</span><span class="token punctuation">:</span> <span class="token variable">$vjt__highlight_border_radius</span><span class="token punctuation">;</span>
  <span class="token property">padding</span><span class="token punctuation">:</span> <span class="token variable">$vjt__highlight_padding</span><span class="token punctuation">;</span>
  <span class="token property">margin</span><span class="token punctuation">:</span> <span class="token variable">$vjt__highlight_margin</span><span class="token punctuation">;</span>
  <span class="token property">box-shadow</span><span class="token punctuation">:</span> 0 0 10px <span class="token variable">$vjt__highlight_color</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>

<span class="token selector">.vjt-actions </span><span class="token punctuation">{</span>
  <span class="token property">display</span><span class="token punctuation">:</span> flex<span class="token punctuation">;</span>
  <span class="token property">justify-content</span><span class="token punctuation">:</span> space-between<span class="token punctuation">;</span>
  <span class="token property">align-items</span><span class="token punctuation">:</span> center<span class="token punctuation">;</span>
  <span class="token property">margin-top</span><span class="token punctuation">:</span> 0.5rem<span class="token punctuation">;</span>
  <span class="token property">gap</span><span class="token punctuation">:</span> 0.5rem<span class="token punctuation">;</span>

  <span class="token selector">button </span><span class="token punctuation">{</span>
    <span class="token property">width</span><span class="token punctuation">:</span> 100%<span class="token punctuation">;</span>
    <span class="token property">padding</span><span class="token punctuation">:</span> 0.25rem 1rem<span class="token punctuation">;</span>
    <span class="token property">border</span><span class="token punctuation">:</span> <span class="token variable">$vjt__action_button_border</span><span class="token punctuation">;</span>
    <span class="token property">border-radius</span><span class="token punctuation">:</span> <span class="token variable">$vjt__action_button_border_radius</span><span class="token punctuation">;</span>
    <span class="token property">background-color</span><span class="token punctuation">:</span> <span class="token variable">$vjt__action_button_background</span><span class="token punctuation">;</span>
    <span class="token property">color</span><span class="token punctuation">:</span> <span class="token variable">$vjt__action_button_color</span><span class="token punctuation">;</span>
    <span class="token property">font-size</span><span class="token punctuation">:</span> <span class="token variable">$vjt__action_button_font_size</span><span class="token punctuation">;</span>
    <span class="token property">font-weight</span><span class="token punctuation">:</span> 500<span class="token punctuation">;</span>
    <span class="token property">transition</span><span class="token punctuation">:</span> all 0.2s ease-in-out<span class="token punctuation">;</span>

    <span class="token selector"><span class="token parent important">&amp;</span>:hover </span><span class="token punctuation">{</span>
      <span class="token property">background-color</span><span class="token punctuation">:</span> <span class="token variable">$vjt__action_button_background_hover</span><span class="token punctuation">;</span>
      <span class="token property">color</span><span class="token punctuation">:</span> <span class="token variable">$vjt__action_button_color_hover</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="custom-container tip"><p class="custom-container-title">TIP</p><p>You can create your own theme in sass, scss or css.<br> As long as the classes are the same.</p></div>`,14),o=[e];function i(c,l){return s(),a("div",null,o)}const d=n(p,[["render",i],["__file","styling.html.vue"]]);export{d as default};
