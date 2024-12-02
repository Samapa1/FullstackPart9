const Notification = ( {message} : { message: string}) => {
    return (
        <div style= {{color: 'red'}}>
        {message}
        </div>
    );
};

export default Notification;