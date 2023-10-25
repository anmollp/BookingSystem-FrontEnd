const Error = ({ children, ...props }) => {
    return (
      <div
        style={{ color: '#f23838', textAlign: 'center', margin: '0.5rem 0', textShadow: '-1px 1px 1px #000, 1px 0.5px 1px #000, 0.5px -1px 0 #000, -1px -1px 0 #000', fontSize: '23px'}}
        {...props}
      >
        {children}
      </div>
    )
  }
  
  export default Error