# Contributing to RPM IQ Exam 🧠

Thank you for your interest in contributing to the RPM IQ Exam project! We welcome contributions from the community and are excited to work with you.

## 📋 Table of Contents

- [Code of Conduct](#-code-of-conduct)
- [Getting Started](#-getting-started)
- [Development Setup](#-development-setup)
- [How to Contribute](#-how-to-contribute)
- [Coding Standards](#-coding-standards)
- [Testing Guidelines](#-testing-guidelines)
- [Submitting Changes](#-submitting-changes)
- [Issue Guidelines](#-issue-guidelines)
- [Pull Request Process](#-pull-request-process)
- [Contributor License Agreement (CLA)](#🛡️-contributor-license-agreement-cla)

## 📜 Code of Conduct

This project and everyone participating in it is governed by our Code of Conduct. By participating, you are expected to uphold this code. Please be respectful, inclusive, and constructive in all interactions.

### Our Standards

- **Be respectful**: Treat everyone with respect and courtesy
- **Be inclusive**: Welcome people of all backgrounds and experience levels
- **Be constructive**: Provide helpful feedback and suggestions
- **Be professional**: Maintain a professional tone in all communications
- **Be patient**: Remember that everyone has different skill levels and perspectives

## 🚀 Getting Started

### Prerequisites

- Node.js 18.0 or higher
- npm or yarn package manager
- Git for version control
- A modern code editor (VS Code recommended)

### Recommended Tools

- **VS Code Extensions**:
  - TypeScript and JavaScript Language Features
  - ESLint
  - Prettier
  - Auto Rename Tag
  - Bracket Pair Colorizer

## 🛠️ Development Setup

1. **Fork the repository** on GitHub
2. **Clone your fork** locally:
   ```bash
   git clone https://github.com/YOUR_USERNAME/rpm-iq-exam.git
   cd rpm-iq-exam
   ```

3. **Install dependencies**:
   ```bash
   npm install
   ```

4. **Start the development server**:
   ```bash
   npm run dev
   ```

5. **Create a new branch** for your feature:
   ```bash
   git checkout -b feature/your-feature-name
   ```

## 🤝 How to Contribute

### Types of Contributions

We welcome the following types of contributions:

- 🐛 **Bug fixes**: Fix existing issues or problems
- ✨ **New features**: Add new functionality or improvements
- 📚 **Documentation**: Improve documentation, guides, or examples
- 🧪 **Tests**: Add or improve test coverage
- 🎨 **UI/UX improvements**: Enhance user interface and experience
- ♿ **Accessibility**: Improve accessibility features
- 🌐 **Internationalization**: Add support for new languages
- ⚡ **Performance**: Optimize performance and efficiency

### Areas for Contribution

- **Puzzle Generation**: Improve RPM pattern generation algorithms
- **UI Components**: Create reusable, accessible components
- **Assessment Logic**: Enhance scoring and analysis features
- **Accessibility**: Ensure WCAG 2.1 compliance
- **Mobile Experience**: Optimize for mobile devices
- **Testing**: Expand test coverage for all components
- **Documentation**: Improve user and developer documentation

## 📏 Coding Standards

### TypeScript/JavaScript

- Use **TypeScript** for all new code
- Follow **functional programming** principles when possible
- Use **meaningful variable and function names**
- Add **JSDoc comments** for complex functions
- Prefer **const** over **let**, avoid **var**
- Use **arrow functions** for short functions
- Implement proper **error handling**

### React Components

- Use **functional components** with hooks
- Implement **proper prop types** with TypeScript interfaces
- Follow the **single responsibility principle**
- Use **custom hooks** for reusable logic
- Implement **proper state management**
- Ensure **accessibility** (ARIA labels, keyboard navigation)

### Styling

- Use **CSS-in-JS** or **CSS Modules** for component styles
- Follow **BEM methodology** for CSS class naming
- Ensure **responsive design** for all screen sizes
- Use **semantic HTML** elements
- Implement **dark mode** support where applicable

### Code Formatting

We use **Prettier** and **ESLint** for code formatting and linting:

```bash
# Format code
npm run format

# Lint code
npm run lint

# Fix linting issues
npm run lint:fix
```

## 🧪 Testing Guidelines

### Test Requirements

- **Write tests** for all new features and bug fixes
- Maintain or improve **test coverage**
- Include **unit tests** for utility functions
- Add **integration tests** for React components
- Write **accessibility tests** where applicable

### Running Tests

```bash
# Run all tests
npm run test

# Run tests in watch mode
npm run test:watch

# Generate coverage report
npm run test:coverage
```

### Test Structure

```typescript
describe('ComponentName', () => {
  it('should render correctly', () => {
    // Test implementation
  });

  it('should handle user interaction', () => {
    // Test implementation
  });

  it('should be accessible', () => {
    // Accessibility test
  });
});
```

## 📤 Submitting Changes

### Commit Message Guidelines

We follow the **Conventional Commits** specification:

```
type(scope): description

[optional body]

[optional footer]
```

**Types:**
- `feat`: New feature
- `fix`: Bug fix
- `docs`: Documentation changes
- `style`: Code style changes (formatting, etc.)
- `refactor`: Code refactoring
- `test`: Adding or updating tests
- `chore`: Maintenance tasks

**Examples:**
```
feat(puzzle): add adaptive difficulty algorithm
fix(ui): resolve mobile layout issues
docs(readme): update installation instructions
test(components): add accessibility tests for PatternDisplay
```

### Before Submitting

1. **Run all tests** and ensure they pass
2. **Check code formatting** with Prettier
3. **Fix any linting issues** with ESLint
4. **Update documentation** if necessary
5. **Test on multiple browsers** and devices
6. **Verify accessibility** compliance

## 🐛 Issue Guidelines

### Before Creating an Issue

1. **Search existing issues** to avoid duplicates
2. **Check the documentation** for solutions
3. **Test with the latest version** of the project

### Issue Templates

We provide issue templates for:
- 🐛 **Bug Reports**: Report issues or problems
- ✨ **Feature Requests**: Suggest new features or improvements

### Bug Report Information

Please include:
- **Clear description** of the issue
- **Steps to reproduce** the problem
- **Expected vs actual behavior**
- **Browser and device information**
- **Screenshots or videos** if applicable
- **Console errors** if any

## 🔄 Pull Request Process

### PR Requirements

1. **Link to related issue** (if applicable)
2. **Clear description** of changes made
3. **Test coverage** for new code
4. **Documentation updates** if necessary
5. **Screenshots** for UI changes
6. **Accessibility review** for UI changes

### PR Review Process

1. **Automated checks** must pass (tests, linting, build)
2. **Code review** by project maintainers
3. **Manual testing** of new features
4. **Documentation review** if applicable
5. **Final approval** and merge

### PR Checklist

- [ ] Code follows project coding standards
- [ ] Tests are written and passing
- [ ] Documentation is updated
- [ ] Changes are tested on multiple browsers
- [ ] Accessibility is maintained or improved
- [ ] No breaking changes (or properly documented)

## 🛡️ Contributor License Agreement (CLA)

By submitting a pull request or contribution, you agree to the following:

> You grant the project founder a **non-exclusive, irrevocable, worldwide, royalty-free license** to use, modify, sublicense, and relicense your contribution, including the right to incorporate it into dual-licensed or commercial versions of the project.

This ensures that the project can grow sustainably while preserving creator rights.  
If you are contributing on behalf of a company or organization, please contact us in advance.

### What This Means

- **You retain copyright** to your contributions
- **You grant us rights** to use your contribution in the project
- **The project can evolve** with different licensing models if needed
- **Your contribution remains** under the project's current license
- **Commercial use** of the project (including your contributions) is possible

### Questions About the CLA

If you have questions about the CLA or need clarification, please:
- Open a discussion on GitHub
- Contact the project maintainers
- Review the LICENSE file for current terms

## 📞 Getting Help

### Community Resources

- 💬 **GitHub Discussions**: Ask questions and share ideas
- 🐛 **Issue Tracker**: Report bugs and request features
- 📚 **Documentation**: Read guides and API references
- 💡 **Examples**: Check out example implementations

### Contact Information

For questions about contributing:
- Create a discussion in the GitHub repository
- Tag maintainers in relevant issues
- Follow the project for updates

## 🎉 Recognition

### Contributors

All contributors will be recognized in:
- **CONTRIBUTORS.md** file
- **GitHub contributors** section
- **Release notes** for significant contributions
- **Project documentation** where appropriate

### Types of Recognition

- **Code contributors**: Listed in contributors file
- **Documentation contributors**: Credited in documentation
- **Issue reporters**: Mentioned in fix commits
- **Community helpers**: Recognized in discussions

## 📋 Development Workflow

### Typical Workflow

1. **Pick an issue** or propose a new feature
2. **Fork and clone** the repository
3. **Create a feature branch** from main
4. **Develop and test** your changes
5. **Commit with clear messages** following conventions
6. **Push to your fork** and create a pull request
7. **Respond to feedback** during code review
8. **Merge** after approval

### Branch Naming

Use descriptive branch names:
- `feature/adaptive-difficulty`
- `fix/mobile-layout-issue`
- `docs/api-documentation`
- `test/puzzle-generation`

## 🚦 Release Process

### Version Numbering

We follow **Semantic Versioning** (SemVer):
- **MAJOR**: Breaking changes
- **MINOR**: New features (backward compatible)
- **PATCH**: Bug fixes (backward compatible)

### Release Schedule

- **Patch releases**: As needed for bug fixes
- **Minor releases**: Monthly for new features
- **Major releases**: Quarterly for significant changes

---

Thank you for contributing to RPM IQ Exam! Your contributions help make cognitive assessment more accessible and effective for everyone. 🚀