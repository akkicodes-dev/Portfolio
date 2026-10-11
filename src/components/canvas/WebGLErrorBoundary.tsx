import { Component, type ErrorInfo, type ReactNode } from 'react';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
}

export class WebGLErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
  };

  public static getDerivedStateFromError(): State {
    return { hasError: true };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.warn('WebGL / R3F Canvas encountered an error, falling back to static avatar image:', error, errorInfo);
  }

  public render() {
    if (this.state.hasError) {
      return (
        <div
          className="fixed inset-0 z-0 flex items-center justify-center pointer-events-none select-none"
          aria-hidden="true"
        >
          <img
            src="/images/akash.png"
            alt="Akash Satao Avatar"
            className="w-[280px] sm:w-[380px] lg:w-[440px] max-h-[75vh] object-contain opacity-85 drop-shadow-[0_20px_50px_rgba(0,0,0,0.8)]"
            loading="eager"
          />
        </div>
      );
    }

    return this.props.children;
  }
}
