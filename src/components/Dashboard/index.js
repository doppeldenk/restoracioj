import React from 'react';
import { Redirect } from 'react-router-dom';

const Dashboard = () => (
  localStorage.isLoggedIn ?
    <div>
      <h1>Dashboard</h1>
      <p>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut nec aliquet dui,
        eu tempor tortor. Ut condimentum quam ut erat mattis finibus. Aliquam erat volutpat.
        Phasellus a convallis diam. Suspendisse vitae quam lectus. Integer sem risus,
        elementum id tempor at, viverra id dolor. Vivamus suscipit nunc lacinia, pharetra
        mauris ut, tincidunt turpis. Curabitur quis condimentum lorem. Donec bibendum odio
        molestie, gravida risus ut, vulputate quam. Donec rhoncus libero enim,
        sed convallis dui consectetur nec. Nulla diam orci, mattis vel augue et,
        pulvinar viverra mauris. Donec at sem vel ligula suscipit euismod. Praesent
        lorem leo, vehicula in sapien vitae, ultrices fermentum ex. In hac habitasse
        platea dictumst.
      </p>
    </div>
    :
    <Redirect to="/login" />
);

export default Dashboard;
