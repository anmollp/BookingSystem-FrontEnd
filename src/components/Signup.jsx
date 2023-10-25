const Signup = ({ children, ...props }) => {
    return (
      <div
        style={{ color: 'blue' , textAlign: 'center', margin: '0.5rem 0' , textDecoration: 'underline'}}
        {...props}
      >
        {children}
      </div>
    )
  }
  
  export default Signup;