import  Component from 'react';

class ErrorBoundary extends Component {
  constructor(props: any ) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error: any, errorInfo: any) {
    console.error('Error caught:', error, errorInfo);
  }

  render() {
    if (this.state?.hasError) {
      return <h2>Failed to load this section.</h2>;
    }
    return this.props?.children;
  }
}

export default ErrorBoundary;
