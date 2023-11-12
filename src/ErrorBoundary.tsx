import { Component, ErrorInfo, ReactNode } from 'react';

interface ErrBoundProps {
  children?: ReactNode;
  hasError?: boolean;
}

interface ErrBoundState {
  hasError?: boolean;
}

class ErrorBoundary extends Component<ErrBoundProps, ErrBoundState> {
  public state: ErrBoundState = {
    hasError: false,
  };

  static getDerivedStateFromError() {
    return { hasError: true };
  }
  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Uncaught error:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return <h1>Something went wrong.</h1>;
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
