/**
 *
 * @author Unni Krishnan
 *
 * This component acts as an error boundary in React applications.
 * It catches JavaScript errors anywhere in its child component tree,
 * logs those errors, and displays a fallback UI instead of the component
 * tree that crashed. This helps in graceful error handling and prevents
 * the entire application from breaking due to errors in a single component.
 *
 */

import React, { Component } from "react";

// Props interface for ErrorBoundery
type ErrorBounderyProps = {
  fallback: React.ReactNode; // UI to show when an error occurs
  children: React.ReactNode; // Child components to render
};

// State interface for ErrorBoundery
type ErrorBounderyState = {
  hasError: boolean; // Indicates whether an error has occurred
};

export default class ErrorBoundery extends Component<
  ErrorBounderyProps,
  ErrorBounderyState
> {
  // Initialize state
  state = { hasError: false };

  // Commented out version with unused parameter
  // static getDerivedStateFromError(_: Error): ErrorBounderyState {
  //   return { hasError: true };
  // }

  /**
   * Update state when an error occurs
   * This is called during the "render" phase, so side-effects are not allowed.
   * @param {Error} error - The error that was thrown
   * @returns {ErrorBounderyState} New state indicating an error occurred
   */
  static getDerivedStateFromError(): ErrorBounderyState {
    return { hasError: true };
  }

  /**
   * Log error information when caught
   * This method is called during the "commit" phase, so side-effects are allowed.
   * @param {Error} error - The error that was thrown
   * @param {React.ErrorInfo} errorInfo - Component stack trace information
   */
  componentDidCatch(error: Error, errorInfo: React.ErrorInfo): void {
    // Log the error to an error reporting service
    console.log("Uncaught error:", error, errorInfo);
  }

  /**
   * Render method
   * @returns {React.ReactNode} fallback UI if there's an error, otherwise renders children
   */
  render(): React.ReactNode {
    if (this.state.hasError) {
      // You can render any custom fallback UI
      return <div>{this.props.fallback}</div>;
    }

    return this.props.children;
  }
}
