// Central Social Links Registry (Step L1)
import { siGithub, siLeetcode, siGeeksforgeeks } from 'simple-icons';

export interface SocialItem {
  id: string;
  name: string;
  handle: string;
  url: string;
  source: 'simple-icons' | 'devicon' | 'monogram' | 'lucide';
  brandHex: string;
  darkFallback?: string;
  viewBox?: string;
  paths?: string[];
  monogram?: string;
  caption?: string;
  isAction?: boolean; // e.g. Email click-to-copy
}

export const socialRegistry: SocialItem[] = [
  {
    id: 'github',
    name: 'GitHub',
    handle: '@akkicodes-dev',
    url: 'https://github.com/akkicodes-dev',
    source: 'simple-icons',
    brandHex: '#181717',
    darkFallback: '#efe6dd',
    viewBox: '0 0 24 24',
    paths: [siGithub.path],
  },
  {
    id: 'linkedin',
    name: 'LinkedIn',
    handle: 'akash-satao',
    url: 'https://www.linkedin.com/in/akash-satao-a56011250/',
    source: 'devicon',
    brandHex: '#0A66C2',
    viewBox: '0 0 128 128',
    paths: [
      'M116 3H12a8.91 8.91 0 00-9 8.8v104.42a8.91 8.91 0 009 8.78h104a8.93 8.93 0 009-8.81V11.77A8.93 8.93 0 00116 3zM39.17 107H21.06V48.73h18.11zm-9-66.21a10.5 10.5 0 1110.49-10.5 10.5 10.5 0 01-10.54 10.48zM107 107H88.89V78.65c0-6.75-.12-15.44-9.41-15.44s-10.87 7.36-10.87 15V107H50.53V48.73h17.36v8h.24c2.42-4.58 8.32-9.41 17.13-9.41C103.6 47.28 107 59.35 107 75z',
    ],
  },
  {
    id: 'leetcode',
    name: 'LeetCode',
    handle: 'Akkicodes-dev',
    url: 'https://leetcode.com/u/Akkicodes-dev/',
    source: 'simple-icons',
    brandHex: '#FFA116',
    viewBox: '0 0 24 24',
    paths: [siLeetcode.path],
    caption: '300+ problems solved across LeetCode and Codolio',
  },
  {
    id: 'codolio',
    name: 'Codolio',
    handle: 'AkkiCodes',
    url: 'https://codolio.com/profile/AkkiCodes',
    source: 'monogram',
    monogram: 'CD',
    brandHex: '#5b8def',
    caption: '300+ problems solved across LeetCode and Codolio',
  },
  {
    id: 'code360',
    name: 'Code360',
    handle: 'Akkicodes',
    url: 'https://www.naukri.com/code360/profile/Akkicodes',
    source: 'monogram',
    monogram: '360',
    brandHex: '#F7941D',
  },
  {
    id: 'geeksforgeeks',
    name: 'GeeksforGeeks',
    handle: 'akashsatj815',
    url: 'https://www.geeksforgeeks.org/profile/akashsatj815',
    source: 'simple-icons',
    brandHex: '#2F8D46',
    viewBox: '0 0 24 24',
    paths: [siGeeksforgeeks.path],
  },
  {
    id: 'email',
    name: 'Email',
    handle: 'akashsatao2303@gmail.com',
    url: 'mailto:akashsatao2303@gmail.com',
    source: 'lucide',
    brandHex: '#5b8def',
    isAction: true,
  },
];
