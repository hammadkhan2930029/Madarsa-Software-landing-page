import dashboardOne from '../assets/dashboard1.png'
import dashboardTwo from '../assets/dashboard2.png'
import slideFour from '../assets/four.png'
import slideOne from '../assets/one.png'
import slideThree from '../assets/three.png'
import slideTwo from '../assets/two.png'
import darkLogo from '../assets/logos/new2.png'
import lightLogo from '../assets/logos/new1.png'
import transparentLogo from '../assets/logos/madarsaLogotransparent.png'
import { resolveAssetUrl } from '../services/api'

const assetMap = {
  'dashboard1.png': dashboardOne,
  'dashboard2.png': dashboardTwo,
  'one.png': slideOne,
  'two.png': slideTwo,
  'three.png': slideThree,
  'four.png': slideFour,
  'new1.png': lightLogo,
  'new2.png': darkLogo,
  'madarsaLogotransparent.png': transparentLogo,
}

export function getAssetUrl(file, fallback) {
  if (!file) return fallback
  return resolveAssetUrl(file) || assetMap[file] || fallback || file
}

export const localAssets = {
  dashboardOne,
  dashboardTwo,
  slideOne,
  slideTwo,
  slideThree,
  slideFour,
  lightLogo,
  darkLogo,
  transparentLogo,
}
