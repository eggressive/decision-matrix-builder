# Decision Matrix Builder

A web-based tool to help you make better decisions using structured analysis of pros and cons. Create decision matrices, score options against criteria, and visualize results to make informed choices.

![Application Screenshot](screenshot.png)

## 🚀 Features

- **Interactive Matrix Builder**: Create decision matrices with multiple options and criteria
- **Weighted Scoring**: Assign weights to criteria and score options (1-10 scale)
- **Pros & Cons Analysis**: Track advantages and disadvantages for each option
- **Real-time Results**: Automatic calculation of weighted scores and rankings
- **Data Persistence**: All data saved locally in browser (no server needed)
- **Export Functionality**: Export matrices to CSV for further analysis
- **Responsive Design**: Works on desktop and mobile devices
- **No Account Required**: Privacy-friendly - your data stays on your device

## 📋 How It Works

1. **Create a new matrix** - Define your decision title and description
2. **Add options** - List all possible alternatives you're considering
3. **Define criteria** - Identify evaluation factors and assign importance weights (must sum to 1)
4. **Score options** - Rate each option against each criterion (1-10 scale)
5. **Add pros/cons** - Document qualitative advantages and disadvantages
6. **Review results** - See automatic rankings based on weighted scores

## 🛠️ Installation

### Prerequisites
- Node.js 18+ (LTS recommended)

### Quick Start

```bash
# Clone the repository
git clone https://github.com/eggressive/decision-matrix-builder.git
cd decision-matrix-builder

# Install dependencies
npm install

# Start development server
npm run dev

# Open your browser and navigate to http://localhost:3000
```

### Build for Production

```bash
# Build the application
npm run build

# Preview the build
npm run preview
```

## 📁 Project Structure

```
decision-matrix-builder/
├── src/
│   ├── components/     # React components
│   │   ├── Dashboard.jsx     # Main dashboard
│   │   ├── MatrixCreator.jsx # Wizard for creating new matrices
│   │   ├── MatrixEditor.jsx  # Editor for existing matrices
│   │   ├── MatrixGrid.jsx    # Interactive scoring grid
│   │   ├── ScoringCell.jsx   # Individual scoring cell
│   │   └── ExportButton.jsx  # Export functionality
│   ├── hooks/          # Custom hooks
│   │   └── useMatrix.js      # Matrix management (CRUD operations)
│   ├── utils/          # Utility functions
│   │   └── calculations.js   # Scoring and validation logic
│   ├── App.jsx         # Main application component
│   ├── main.jsx        # Application entry point
│   └── index.css       # Global styles
├── public/             # Static assets
├── package.json        # Dependencies and scripts
├── vite.config.js      # Vite configuration
└── tailwind.config.js  # Tailwind CSS configuration
```

## 🎨 Technology Stack

- **React 18** - Component-based UI
- **Vite** - Fast development server and build tool
- **Tailwind CSS** - Utility-first CSS framework
- **File Saver** - Client-side file export
- **LocalStorage** - Data persistence

## 📱 Responsive Design

The application is fully responsive and works on various screen sizes:
- **Desktop**: Full-featured grid interface
- **Tablet**: Adapted layout for touch interaction
- **Mobile**: Simplified view with essential functionality

## 🔒 Privacy

- **No Server Required**: All data is stored locally in your browser
- **No Tracking**: No analytics or user tracking
- **Offline Capable**: Works without internet connection after initial load
- **Data Control**: You own your data - export or delete anytime

## 📖 Usage Examples

### Career Decisions
- Compare job offers based on salary, growth, culture, location
- Track pros/cons for each opportunity
- Make data-driven career moves

### Purchasing Decisions
- Evaluate products based on price, quality, features, reviews
- Avoid buyer's remorse with structured analysis

### Life Choices
- Big life decisions (move, education, relationships)
- Balance quantitative and qualitative factors

### Business Strategy
- Evaluate market opportunities
- Compare project proposals
- Make team decisions collaboratively

## 🔧 Development

### Running Tests
```bash
# No formal test suite yet, but you can...
npm run dev  # Start development server and test manually
```

### Contributing
1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

### Common Issues

**"npm run dev" not working?**
- Make sure Node.js is installed
- Delete node_modules and reinstall: `rm -rf node_modules && npm install`

**Data not saving?**
- Check browser's LocalStorage permissions
- Clear site data or try incognito mode

## 📄 License

MIT License - see LICENSE file for details.

## 🙏 Acknowledgments

- Inspired by decision matrix techniques from various productivity methodologies
- Built with modern web technologies for accessibility and performance

## 📞 Support

For issues and feature requests, please use the GitHub Issues page:
https://github.com/eggressive/decision-matrix-builder/issues

## ✨ Contributors

- **Primary Developer**: [Your Name/Username]
- **Special Thanks**: Nous Research for the Hermes Agent that assisted in development

## 🔗 Related Projects

- [Decision Matrix Template](https://www.decision-matrix.com) - Online decision tools
- [Weighted Decision Matrix](https://www.weighteddecisionmatrix.com) - Similar concept
- [Grid Analysis](https://www.mindtools.com/pages/article/newTED_05.htm) - Decision making technique

---

*Last updated: June 2026*
*Made with ❤️ using React & Vite*