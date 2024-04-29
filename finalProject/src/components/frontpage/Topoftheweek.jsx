import React from 'react'
import './topoftheweek.css'
function Topoftheweek() {
  return (
    <div className='week'>
        <h2>TOP 3 PROFESSIONAL OF THE WEEK </h2>

        <div class="container">
        <div class="card">
            <div class="image-container">
            <img src="path-to-image-1" alt="Profile  1"/>
            </div>
            <p>Name 1</p>
            <p>Category 1</p>
            <p>Description 1</p>
        </div>

        <div class="card large">
            <div class="image-container">
            <img src="path-to-image-2" alt="Profile  2"/>
            </div>
            <p>Name 2</p>
            <p>Category 2</p>
            <p>Description 2</p>
        </div>

        <div class="card">
            <div class="image-container">
            <img src="path-to-image-3" alt="Profile  3"/>
            </div>
            <p>Name 3</p>
            <p>Category 3</p>
            <p>Description 3</p>
        </div>
        </div>
    </div>
  )
}

export default Topoftheweek