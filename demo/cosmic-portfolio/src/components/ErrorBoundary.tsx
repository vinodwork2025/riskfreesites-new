import { Component, ReactNode } from 'react'

interface Props { children: ReactNode }
interface State { error: Error | null }

export default class ErrorBoundary extends Component<Props, State> {
  state: State = { error: null }

  static getDerivedStateFromError(error: Error): State {
    return { error }
  }

  render() {
    if (this.state.error) {
      return (
        <div style={{
          position: 'fixed', inset: 0, background: '#0a0a0a', color: '#fff',
          display: 'flex', flexDirection: 'column', alignItems: 'center',
          justifyContent: 'center', fontFamily: 'monospace', padding: '2rem',
          textAlign: 'center',
        }}>
          <p style={{ color: '#89AACC', marginBottom: '1rem', fontSize: '0.75rem', letterSpacing: '0.2em', textTransform: 'uppercase' }}>
            Render Error
          </p>
          <pre style={{ fontSize: '0.8rem', color: '#ff6b6b', maxWidth: '600px', whiteSpace: 'pre-wrap', wordBreak: 'break-word' }}>
            {this.state.error.message}
          </pre>
          <pre style={{ fontSize: '0.7rem', color: '#666', maxWidth: '600px', marginTop: '1rem', whiteSpace: 'pre-wrap', textAlign: 'left' }}>
            {this.state.error.stack?.split('\n').slice(1, 5).join('\n')}
          </pre>
        </div>
      )
    }
    return this.props.children
  }
}
