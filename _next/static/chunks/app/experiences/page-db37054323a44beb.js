(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[220],{2527:function(e,t,r){Promise.resolve().then(r.bind(r,5362))},6648:function(e,t,r){"use strict";r.d(t,{default:function(){return n.a}});var o=r(5601),n=r.n(o)},5601:function(e,t,r){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),function(e,t){for(var r in t)Object.defineProperty(e,r,{enumerable:!0,get:t[r]})}(t,{default:function(){return s},getImageProps:function(){return l}});let o=r(9920),n=r(497),i=r(8173),a=o._(r(1241));function l(e){let{props:t}=(0,n.getImgProps)(e,{defaultLoader:a.default,imgConf:{deviceSizes:[640,750,828,1080,1200,1920,2048,3840],imageSizes:[16,32,48,64,96,128,256,384],path:"/portfolio-react/_next/image",loader:"default",dangerouslyAllowSVG:!1,unoptimized:!1}});for(let[e,r]of Object.entries(t))void 0===r&&delete t[e];return{props:t}}let s=i.Image},5362:function(e,t,r){"use strict";r.r(t),r.d(t,{default:function(){return eb}});var o=r(7437),n=r(2265),i=r.t(n,2),a=r(2988),l=r(3950),s=r(4839),c=r(6259),u=r(3536),d=r(9481);function p(e){let{theme:t,name:r,props:o}=e;return t&&t.components&&t.components[r]&&t.components[r].defaultProps?(0,d.Z)(t.components[r].defaultProps,o):o}var m=r(3143),f=r(6132),x=function(){let e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:null,t=n.useContext(f.T);return t&&0!==Object.keys(t).length?t:e};let h=(0,m.Z)();var g=function(){let e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:h;return x(e)},v=r(2934),y=r(2737);function Z(e){let{props:t,name:r}=e;return function(e){let{props:t,name:r,defaultTheme:o,themeId:n}=e,i=g(o);return n&&(i=i[n]||i),p({theme:i,name:r,props:t})}({props:t,name:r,defaultTheme:v.Z,themeId:y.Z})}let b=n.createContext({});var j=r(7542),w=r(4535);function N(e){return(0,j.ZP)("MuiTimeline",e)}(0,w.Z)("MuiTimeline",["root","positionLeft","positionRight","positionAlternate","positionAlternateReverse"]);var M=r(2272);function C(e){return"alternate-reverse"===e?"positionAlternateReverse":`position${(0,M.Z)(e)}`}let R=["position","className"],T=e=>{let{position:t,classes:r}=e,o={root:["root",t&&C(t)]};return(0,c.Z)(o,N,r)},S=(0,u.ZP)("ul",{name:"MuiTimeline",slot:"Root",overridesResolver:(e,t)=>{let{ownerState:r}=e;return[t.root,r.position&&t[C(r.position)]]}})({display:"flex",flexDirection:"column",padding:"6px 16px",flexGrow:1}),P=n.forwardRef(function(e,t){let r=Z({props:e,name:"MuiTimeline"}),{position:i="right",className:c}=r,u=(0,l.Z)(r,R),d=(0,a.Z)({},r,{position:i}),p=T(d),m=n.useMemo(()=>({position:i}),[i]);return(0,o.jsx)(b.Provider,{value:m,children:(0,o.jsx)(S,(0,a.Z)({className:(0,s.Z)(p.root,c),ownerState:d,ref:t},u))})});function k(e){return(0,j.ZP)("MuiTimelineItem",e)}let A=(0,w.Z)("MuiTimelineItem",["root","positionLeft","positionRight","positionAlternate","positionAlternateReverse","missingOppositeContent"]);var O=r(9633);function _(e){return(0,j.ZP)("MuiTimelineContent",e)}let z=(0,w.Z)("MuiTimelineContent",["root","positionLeft","positionRight","positionAlternate","positionAlternateReverse"]),I=(0,w.Z)("MuiTimelineOppositeContent",["root","positionLeft","positionRight","positionAlternate","positionAlternateReverse"]),L=["position","className"],W=e=>{let{position:t,classes:r,hasOppositeContent:o}=e,n={root:["root",C(t),!o&&"missingOppositeContent"]};return(0,c.Z)(n,k,r)},B=(0,u.ZP)("li",{name:"MuiTimelineItem",slot:"Root",overridesResolver:(e,t)=>{let{ownerState:r}=e;return[t.root,t[C(r.position)]]}})(e=>{let{ownerState:t}=e;return(0,a.Z)({listStyle:"none",display:"flex",position:"relative",minHeight:70},"left"===t.position&&{flexDirection:"row-reverse"},("alternate"===t.position||"alternate-reverse"===t.position)&&{["&:nth-of-type(".concat("alternate"===t.position?"even":"odd",")")]:{flexDirection:"row-reverse",["& .".concat(z.root)]:{textAlign:"right"},["& .".concat(I.root)]:{textAlign:"left"}}},!t.hasOppositeContent&&{"&::before":{content:'""',flex:1,padding:"6px 16px"}})}),D=n.forwardRef(function(e,t){let r=Z({props:e,name:"MuiTimelineItem"}),{position:i,className:c}=r,u=(0,l.Z)(r,L),{position:d}=n.useContext(b),p=!1;n.Children.forEach(r.children,e=>{(0,O.Z)(e,["TimelineOppositeContent"])&&(p=!0)});let m=(0,a.Z)({},r,{position:i||d||"right",hasOppositeContent:p}),f=W(m),x=n.useMemo(()=>({position:m.position}),[m.position]);return(0,o.jsx)(b.Provider,{value:x,children:(0,o.jsx)(B,(0,a.Z)({className:(0,s.Z)(f.root,c),ownerState:m,ref:t},u))})});function E(e){return(0,j.ZP)("MuiTimelineSeparator",e)}(0,w.Z)("MuiTimelineSeparator",["root"]);let G=["className"],V=e=>{let{classes:t}=e;return(0,c.Z)({root:["root"]},E,t)},F=(0,u.ZP)("div",{name:"MuiTimelineSeparator",slot:"Root",overridesResolver:(e,t)=>t.root})({display:"flex",flexDirection:"column",flex:0,alignItems:"center"}),q=n.forwardRef(function(e,t){let r=Z({props:e,name:"MuiTimelineSeparator"}),{className:n}=r,i=(0,l.Z)(r,G),c=V(r);return(0,o.jsx)(F,(0,a.Z)({className:(0,s.Z)(c.root,n),ownerState:r,ref:t},i))});function H(e){return(0,j.ZP)("MuiTimelineConnector",e)}(0,w.Z)("MuiTimelineConnector",["root"]);let J=["className"],Q=e=>{let{classes:t}=e;return(0,c.Z)({root:["root"]},H,t)},U=(0,u.ZP)("span",{name:"MuiTimelineConnector",slot:"Root",overridesResolver:(e,t)=>t.root})(e=>{let{theme:t}=e;return{width:2,backgroundColor:(t.vars||t).palette.grey[400],flexGrow:1}}),$=n.forwardRef(function(e,t){let r=Z({props:e,name:"MuiTimelineConnector"}),{className:n}=r,i=(0,l.Z)(r,J),c=Q(r);return(0,o.jsx)(U,(0,a.Z)({className:(0,s.Z)(c.root,n),ownerState:r,ref:t},i))});var K=r(261),X=r(9570);function Y(e){return(0,j.ZP)("MuiTypography",e)}(0,w.Z)("MuiTypography",["root","h1","h2","h3","h4","h5","h6","subtitle1","subtitle2","body1","body2","inherit","button","caption","overline","alignLeft","alignRight","alignCenter","alignJustify","noWrap","gutterBottom","paragraph"]);let ee=["align","className","component","gutterBottom","noWrap","paragraph","variant","variantMapping"],et=e=>{let{align:t,gutterBottom:r,noWrap:o,paragraph:n,variant:i,classes:a}=e,l={root:["root",i,"inherit"!==e.align&&"align".concat((0,M.Z)(t)),r&&"gutterBottom",o&&"noWrap",n&&"paragraph"]};return(0,c.Z)(l,Y,a)},er=(0,u.ZP)("span",{name:"MuiTypography",slot:"Root",overridesResolver:(e,t)=>{let{ownerState:r}=e;return[t.root,r.variant&&t[r.variant],"inherit"!==r.align&&t["align".concat((0,M.Z)(r.align))],r.noWrap&&t.noWrap,r.gutterBottom&&t.gutterBottom,r.paragraph&&t.paragraph]}})(e=>{let{theme:t,ownerState:r}=e;return(0,a.Z)({margin:0},"inherit"===r.variant&&{font:"inherit"},"inherit"!==r.variant&&t.typography[r.variant],"inherit"!==r.align&&{textAlign:r.align},r.noWrap&&{overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap"},r.gutterBottom&&{marginBottom:"0.35em"},r.paragraph&&{marginBottom:16})}),eo={h1:"h1",h2:"h2",h3:"h3",h4:"h4",h5:"h5",h6:"h6",subtitle1:"h6",subtitle2:"h6",body1:"p",body2:"p",inherit:"p"},en={primary:"primary.main",textPrimary:"text.primary",secondary:"secondary.main",textSecondary:"text.secondary",error:"error.main"},ei=e=>en[e]||e,ea=n.forwardRef(function(e,t){let r=(0,X.i)({props:e,name:"MuiTypography"}),n=ei(r.color),i=(0,K.Z)((0,a.Z)({},r,{color:n})),{align:c="inherit",className:u,component:d,gutterBottom:p=!1,noWrap:m=!1,paragraph:f=!1,variant:x="body1",variantMapping:h=eo}=i,g=(0,l.Z)(i,ee),v=(0,a.Z)({},i,{align:c,color:n,className:u,component:d,gutterBottom:p,noWrap:m,paragraph:f,variant:x,variantMapping:h}),y=d||(f?"p":h[x]||eo[x])||"span",Z=et(v);return(0,o.jsx)(er,(0,a.Z)({as:y,ref:t,ownerState:v,className:(0,s.Z)(Z.root,u)},g))}),el=["className"],es=e=>{let{position:t,classes:r}=e,o={root:["root",C(t)]};return(0,c.Z)(o,_,r)},ec=(0,u.ZP)(ea,{name:"MuiTimelineContent",slot:"Root",overridesResolver:(e,t)=>{let{ownerState:r}=e;return[t.root,t[C(r.position)]]}})(e=>{let{ownerState:t}=e;return(0,a.Z)({flex:1,padding:"6px 16px",textAlign:"left"},"left"===t.position&&{textAlign:"right"})}),eu=n.forwardRef(function(e,t){let r=Z({props:e,name:"MuiTimelineContent"}),{className:i}=r,c=(0,l.Z)(r,el),{position:u}=n.useContext(b),d=(0,a.Z)({},r,{position:u||"right"}),p=es(d);return(0,o.jsx)(ec,(0,a.Z)({component:"div",className:(0,s.Z)(p.root,i),ownerState:d,ref:t},c))});function ed(e){return(0,j.ZP)("MuiTimelineDot",e)}(0,w.Z)("MuiTimelineDot",["root","filled","outlined","filledGrey","outlinedGrey","filledPrimary","outlinedPrimary","filledSecondary","outlinedSecondary"]);let ep=["className","color","variant"],em=e=>{let{color:t,variant:r,classes:o}=e,n={root:["root",r,"inherit"!==t&&"".concat(r).concat((0,M.Z)(t))]};return(0,c.Z)(n,ed,o)},ef=(0,u.ZP)("span",{name:"MuiTimelineDot",slot:"Root",overridesResolver:(e,t)=>{let{ownerState:r}=e;return[t.root,t["inherit"!==r.color&&"".concat(r.variant).concat((0,M.Z)(r.color))],t[r.variant]]}})(e=>{let{ownerState:t,theme:r}=e;return(0,a.Z)({display:"flex",alignSelf:"baseline",borderStyle:"solid",borderWidth:2,padding:4,borderRadius:"50%",boxShadow:(r.vars||r).shadows[1],margin:"11.5px 0"},"filled"===t.variant&&(0,a.Z)({borderColor:"transparent"},"inherit"!==t.color&&(0,a.Z)({},"grey"===t.color?{color:(r.vars||r).palette.grey[50],backgroundColor:(r.vars||r).palette.grey[400]}:{color:(r.vars||r).palette[t.color].contrastText,backgroundColor:(r.vars||r).palette[t.color].main})),"outlined"===t.variant&&(0,a.Z)({boxShadow:"none",backgroundColor:"transparent"},"inherit"!==t.color&&(0,a.Z)({},"grey"===t.color?{borderColor:(r.vars||r).palette.grey[400]}:{borderColor:(r.vars||r).palette[t.color].main})))}),ex=n.forwardRef(function(e,t){let r=Z({props:e,name:"MuiTimelineDot"}),{className:n,color:i="grey",variant:c="filled"}=r,u=(0,l.Z)(r,ep),d=(0,a.Z)({},r,{color:i,variant:c}),p=em(d);return(0,o.jsx)(ef,(0,a.Z)({className:(0,s.Z)(p.root,n),ownerState:d,ref:t},u))});var eh=r(9973),eg=r(6648),ev=r(9055),ey=r(8017);let eZ=i.useSyncExternalStore;function eb(){let[e,t]=(0,n.useState)([]),[r,i]=(0,n.useState)(null),a=e=>{i(e)},l=()=>{i(null)};(0,n.useEffect)(()=>{!async function(){let e=await fetch("/metadata.json");t((await e.json()).experiences)}()},[]);let s=function(e){let t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{},r=x(),o="undefined"!=typeof window&&void 0!==window.matchMedia,{defaultMatches:i=!1,matchMedia:a=o?window.matchMedia:null,ssrMatchMedia:l=null,noSsr:s=!1}=p({name:"MuiUseMediaQuery",props:t,theme:r}),c="function"==typeof e?e(r):e;return(void 0!==eZ?function(e,t,r,o,i){let a=n.useCallback(()=>t,[t]),l=n.useMemo(()=>{if(i&&r)return()=>r(e).matches;if(null!==o){let{matches:t}=o(e);return()=>t}return a},[a,e,o,i,r]),[s,c]=n.useMemo(()=>{if(null===r)return[a,()=>()=>{}];let t=r(e);return[()=>t.matches,e=>(t.addListener(e),()=>{t.removeListener(e)})]},[a,r,e]);return eZ(c,s,l)}:function(e,t,r,o,i){let[a,l]=n.useState(()=>i&&r?r(e).matches:o?o(e).matches:t);return(0,ey.Z)(()=>{let t=!0;if(!r)return;let o=r(e),n=()=>{t&&l(o.matches)};return n(),o.addListener(n),()=>{t=!1,o.removeListener(n)}},[e,r]),a})(c=c.replace(/^@media( ?)/m,""),i,a,l,s)}("(max-width: 640px)"),c=s?{["& .".concat(A.root,":before")]:{flex:0,padding:0}}:{};return(0,o.jsxs)("div",{className:"grid grid-cols-12 justify-items-center content-start min-h-[calc(100vh-161px)]  sm:px-8 py-4 ",children:[(0,o.jsxs)("div",{className:"col-span-10 col-start-2 col-end-12 p-8 lg:col-span-6 lg:col-start-4 lg:col-end-10 md:col-span-8 md:col-start-3 md:col-end-11 p-8",children:[(0,o.jsx)("h1",{className:"lg:text-4xl md:text-3xl sm:text-2xl xs:text-lg text-md font-extrabold tracking-tight text-center",children:"_experience(s)"}),(0,o.jsx)("p",{className:"lg:text-lg md:text-md sm:text-sm text-xs text-muted-foreground text-justify leading-tight",children:"Career-related work experience I've gained."})]}),(0,o.jsx)("div",{className:"col-span-12 xl:w-9/12 lg:w-10/12 md:w-11/12 w-full p-8 sm:p-4",children:(0,o.jsxs)(P,{position:s?"right":"alternate",sx:c,children:[e.map((e,t)=>(0,o.jsxs)(D,{children:[(0,o.jsxs)(q,{children:[(0,o.jsx)(ex,{}),(0,o.jsx)($,{})]}),(0,o.jsxs)(eu,{className:"grid grid-cols-12 content-center mb-8",children:[(0,o.jsxs)("div",{className:"col-span-12",children:[(0,o.jsx)("h3",{className:"text-balance lg:text-2xl md:text-xl sm:text-lg xs:text-md text-sm  font-semibold font-kode-mono text-pretty",children:e.company}),(0,o.jsx)("h3",{className:"text-balance whitespace-pre-line lg:text-xl md:text-lg sm:text-md xs:text-sm text-xs  font-kode-mono font-semibold text-pretty",children:e.time}),(0,o.jsx)("h3",{className:"text-balance whitespace-pre-line lg:text-xl md:text-lg sm:text-md xs:text-sm text-xs font-kode-mono font-semibold text-pretty",children:e.title})]}),(0,o.jsx)(eh.Separator,{className:"my-2 col-span-12"}),(0,o.jsx)("div",{className:"col-span-12",children:(0,o.jsx)("p",{className:"text-balance text-justify font-kode-mono lg:text-md md:text-sm text-xs",children:e.content})}),e.image&&(0,o.jsxs)(o.Fragment,{children:[(0,o.jsx)("div",{className:"col-span-12",onClick:()=>a(e.image),children:(0,o.jsx)(eg.default,{src:e.image,className:"object-contain w-full h-full border-4 border-solid cursor-zoom-in",alt:"Experience image ".concat(t+1),width:500,height:500,priority:!0,quality:100})}),r&&(0,o.jsx)("div",{className:"fixed inset-0 flex items-center justify-center bg-black bg-opacity-75 cursor-zoom-out z-20",onClick:l,children:(0,o.jsx)(eg.default,{src:r,alt:"Zoomed experience image",layout:"fill",objectFit:"contain"})})]}),(0,o.jsx)("div",{className:"col-span-12 mt-2",children:e.tech_badge.map((e,t)=>(0,o.jsx)(ev.C,{className:"text-balance hover:bg-neon-green mx-1 font-kode-mono text-[8px] sm:text-[10px]",children:e},t))})]})]},t)),(0,o.jsxs)(D,{children:[(0,o.jsxs)(q,{children:[(0,o.jsx)($,{}),(0,o.jsx)(ex,{})]}),(0,o.jsx)(eu,{sx:{py:"12px",px:2}})]})]})})]})}},9055:function(e,t,r){"use strict";r.d(t,{C:function(){return l}});var o=r(7437);r(2265);var n=r(2218),i=r(9354);let a=(0,n.j)("inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",{variants:{variant:{default:"border-transparent bg-primary text-primary-foreground hover:bg-primary/80",secondary:"border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/80",destructive:"border-transparent bg-destructive text-destructive-foreground hover:bg-destructive/80",outline:"text-foreground"}},defaultVariants:{variant:"default"}});function l(e){let{className:t,variant:r,...n}=e;return(0,o.jsx)("div",{className:(0,i.cn)(a({variant:r}),t),...n})}},9973:function(e,t,r){"use strict";r.d(t,{Separator:function(){return l}});var o=r(7437),n=r(2265),i=r(8484),a=r(9354);let l=n.forwardRef((e,t)=>{let{className:r,orientation:n="horizontal",decorative:l=!0,...s}=e;return(0,o.jsx)(i.f,{ref:t,decorative:l,orientation:n,className:(0,a.cn)("shrink-0 bg-border","horizontal"===n?"h-[1px] w-full":"h-full w-[1px]",r),...s})});l.displayName=i.f.displayName},9354:function(e,t,r){"use strict";r.d(t,{cn:function(){return i}});var o=r(4839),n=r(6164);function i(){for(var e=arguments.length,t=Array(e),r=0;r<e;r++)t[r]=arguments[r];return(0,n.m6)((0,o.W)(t))}},8484:function(e,t,r){"use strict";r.d(t,{f:function(){return c}});var o=r(2265),n=r(5171),i=r(7437),a="horizontal",l=["horizontal","vertical"],s=o.forwardRef((e,t)=>{let{decorative:r,orientation:o=a,...s}=e,c=l.includes(o)?o:a;return(0,i.jsx)(n.WV.div,{"data-orientation":c,...r?{role:"none"}:{"aria-orientation":"vertical"===c?c:void 0,role:"separator"},...s,ref:t})});s.displayName="Separator";var c=s}},function(e){e.O(0,[990,173,971,23,744],function(){return e(e.s=2527)}),_N_E=e.O()}]);