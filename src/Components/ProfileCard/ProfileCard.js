import React from 'react';
import './ProfileCard.css';

function ProfileCard({ name, phone, email}) {
    return (
        <div className="profile-card">
            <h4>{name}</h4>
            <p>{phone}</p>
            <p>{email}</p>
        </div>
    );
}

export default ProfileCard;