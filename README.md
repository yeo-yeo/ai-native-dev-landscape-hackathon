# AI Native Dev Landscape - Data
## Introduction
The AI Native Dev Landscape is a project by [AI Native Dev](https://ainativedev.io) to help developers keep track of the AI tools and technologies that are available. It is a community curated list and we welcome contributions.

This repository contains the data that powers the [https://landscape.ainativedev.io](https://landscape.ainativedev.io) website.

## Terminology
- The whole dataset is referred to as `Landscape`.
- The landscape consists of different `Domains`.
- Each domain has multiple `Categories`.
- And under categories we have `Tools`

## Contributing to the Landscape
### Data
We welcome contributions to the data. Please see the [CONTRIBUTING.md](CONTRIBUTING.md) file for more information.

### Website
We also welcome contributions to the website. See the [README.md](aind-landing-Page/README.md) file for more information.

## YAML Structure
### Domain
```yaml
domain:
  name: string # Name of the domain
  description: string # Description of the domain
  level: integer # Level of the domain, this is used for display purposes, the lowest level has the highest priority on the landscape map
```
### Category
```yaml
category:
  name: string # Name of the category
  description: string # Description of the category
  level: integer # Level of the category, this is used for display purposes, the lowest level has the highest priority on the landscape map
```

### Tool
```yaml
tool:
  name: string # Name of the tool
  description: string # Description of the tool
  icon_url: string # URL to the tool's icon
  website_url: string # URL to the tool's website
  tags: list[string] # Array of tags
  date_added: string # Date when the tool was added to the landscape DD/MM/YYYY
  oss: boolean # Whether the tool is open source
  verified: boolean # Whether the tool is vendor verified
  beta: boolean # Whether the tool is in beta (if false the tool is considered GA)
```


## License
This project is licensed under the [MIT License](LICENSE).


## Contributors

<a href="https://github.com/ainativedev/aind-landing-Page/graphs/contributors">
  <img src="https://contrib.rocks/image?repo=ainativedev/aind-landing-Page" />
</a>

