# SmartBets - Betting Slip Generator

## Project Overview

A professional React-based betting slip generator built with TypeScript, Vite, and Tailwind CSS. Create high-quality betting slips for up to 10 matches with support for Paripesa and Afropari betting codes.

## Features

- **Professional Design**: Clean, modern interface with SmartBets branding
- **High-Quality Downloads**: 1080x1350 pixel betting slips with 3x rendering scale
- **Multi-Match Support**: Handle up to 10 matches with dynamic sizing
- **Betting Code Integration**: Support for both Paripesa and Afropari codes
- **Social Media Ready**: Built-in social media icons and watermark
- **Responsive Layout**: Works seamlessly across different devices

## Technologies Used

This project is built with:

- **Vite** - Fast build tool and development server
- **TypeScript** - Type-safe JavaScript development
- **React** - Modern UI library with hooks
- **Tailwind CSS** - Utility-first CSS framework
- **html2canvas** - High-quality image generation
- **shadcn/ui** - Modern component library

## Development Setup

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn package manager

### Installation

```sh
# Clone the repository
git clone <repository-url>

# Navigate to project directory
cd smartbets-betting-slip-generator

# Install dependencies
npm install

# Start development server
npm run dev
```

### Available Scripts

- `npm run dev` - Start development server with hot reload
- `npm run build` - Build for production
- `npm run build:dev` - Build in development mode
- `npm run preview` - Preview production build locally
- `npm run lint` - Run ESLint for code quality

## Project Structure

```
src/
├── components/
│   ├── BettingSlipGenerator.tsx    # Main generator component
│   ├── BettingSlipPreview.tsx      # Preview and download logic
│   ├── MatchForm.tsx               # Match input form
│   └── ui/                         # Reusable UI components
├── types/
│   └── match.ts                    # TypeScript interfaces
├── hooks/                          # Custom React hooks
├── lib/                            # Utility functions
└── pages/                          # Page components

public/
├── smartbetlogo.png               # SmartBets logo
├── watermark.png                  # Watermark overlay
├── telegram.png                   # Social media icons
├── twitter.png
└── web.png
```

## Usage

1. **Add Matches**: Enter team names, odds, and match details
2. **Set Betting Codes**: Add Paripesa and/or Afropari codes
3. **Set Date**: Choose the betting slip date
4. **Preview**: View the formatted betting slip
5. **Download**: Generate and download high-quality image

## Deployment

The project can be deployed to any static hosting service:

- **Vercel**: Connect repository and deploy automatically
- **Netlify**: Drag and drop build folder or connect Git
- **GitHub Pages**: Use GitHub Actions for automated deployment

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/new-feature`)
3. Commit changes (`git commit -am 'Add new feature'`)
4. Push to branch (`git push origin feature/new-feature`)
5. Create a Pull Request

## License

This project is proprietary software developed for SmartBets.

## Contact

For questions or support, contact SmartBets team.
