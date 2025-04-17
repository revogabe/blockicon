## BlockIcon 🚀✨  

BlockIcon is an open-source library designed to make it easy to integrate cryptocurrency icons into websites and applications. Our goal is to provide a comprehensive and up-to-date set of icons for developers working with blockchain, exchanges, wallets, and other crypto platforms.  

### 🔥 What We Offer  
✅ Ready-to-use cryptocurrency icons  
✅ Lightweight and easy-to-integrate library  
✅ Frequent updates with new icons  
✅ Open-source and free for the community  

### Installation

Install BlockIcon in your project with a single command:

```bash
pnpm add @blockicon/react
```

### How to use

BlockIcon is simple and intuitive to integrate.

```tsx
import { BlockIcon } from '@blockicon/react'

export default function Example() {
    return <BlockIcon category="network" chain="ethereum" />
}
```

### Component Props

| Prop      | Type                        | Description                                                        |
| --------- | ----------------------------|--------------------------------------------------------------------|
| category  | `"network"` `"token"`           | The category of the icon, whether it is a network or a token       |
| asset     | `string` `number`               | Present when category is token. Use token symbol, address or name. |
| chain     | `string` `number`               | Present when category is network. Use the network name or chainId  |
| shape     | `"circle"` `"square"`           | Icon shape                                                         |
| size      | `"sm"` `"md"` `"lg"` `"xl"`         | Icon size                                                          |


### Data Attributes

| Attribute      | Value                       | 
|----------------|-----------------------------|
| data-category  | `"network"` `"token"`           | 
| data-shape     | `"circle"` `"square"`           |
| data-size      | `"sm"` `"md"` `"lg"` `"xl"`         | 

### 💡 How to Contribute?  
We’re building BlockIcon with the community! If you’d like to contribute with icons, improvements, or suggestions, feel free to open a PR or issue.  

### 🎉 Become a Sponsor!  
If you have a website or project that needs crypto icons and want to be one of our first sponsors, reach out for exclusive support!  

📌 Stay tuned for more updates! 🚀
