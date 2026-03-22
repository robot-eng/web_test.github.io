import React from 'react';

export class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null, errorInfo: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    this.setState({ errorInfo });
    console.error("ErrorBoundary caught an error", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div style={{ padding: '20px', color: 'red', backgroundColor: '#1e1e2e', minHeight: '100vh', fontFamily: 'monospace' }}>
          <h2>แอปพัง (Runtime Error)!</h2>
          <p>กรุณาก๊อปปี้ข้อความด้านล่างนี้ ส่งให้ผู้พัฒนา (AI) ดูหน่อยครับ:</p>
          <hr style={{ margin: '10px 0', borderColor: 'red' }} />
          <p style={{ fontWeight: 'bold' }}>{this.state.error && this.state.error.toString()}</p>
          <pre style={{ overflowX: 'auto', whiteSpace: 'pre-wrap', marginTop: '10px', fontSize: '12px', color: '#ffaaaa' }}>
            {this.state.errorInfo?.componentStack}
          </pre>
        </div>
      );
    }
    return this.props.children;
  }
}
