import React from "react";
import { NotePadApp } from "./NotePadApp";

const CREDITS_CONTENT = `
<p>Credits</p>
<p>Background video: The Drive - 12 Hours - 4K Ultra HD 60fps</p>
<p>by VISUALDON</p>
<p><a href="https://www.youtube.com/watch?v=rqJDO3TWnac" target="_blank" rel="noopener noreferrer">https://www.youtube.com/watch?v=rqJDO3TWnac</a></p>
<p>This portfolio was built with:</p>
<ul>
  <li>Next.js</li>
  <li>React</li>
  <li>TypeScript</li>
  <li>Tailwind CSS</li>
  <li>Framer Motion</li>
  <li>TipTap</li>
  <li>Resend</li>
</ul>
<p>Special thanks to all the open-source contributors!</p>
`;

export const Credits = () => <NotePadApp text={CREDITS_CONTENT} />;
