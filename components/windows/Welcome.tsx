import React from "react";
import { NotePadApp } from "./NotePadApp";

const INITIAL_CONTENT = `
<p>Hi there! 👋</p>
<p>I'm a Software Engineer with a passion for building anything, and everything.</p>
<p>I love turning complex problems into simple, beautiful, and intuitive bits of code. When I'm not coding, you can find me exploring new tech, gaming, or raving.</p>
<p>Feel free to browse "Syntwave OS" to learn more about my work!</p>
<p>Here are some fun facts about me:</p>
<ul>
  <li>Lived in 2 different countries</li>
  <li>Have a cat named Whiskey because I like whisky</li>
  <li>Love Synthwave and techno music</li>
</ul>
`;

export const Welcome = () => <NotePadApp text={INITIAL_CONTENT} />;
