import React from 'react';
import logo1 from './img/logo2.jpg';
import logo2 from './img/logo2oro.jpg';
import logo3 from './img/logo2plata.jpg';
import logo4 from './img/logo2negro.jpg';

class ImageSlider extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      images: [logo1, logo2, logo3, logo4],
      currentIndex: 0,
      currentColor: 'Violeta',
      colors: [
        { name: 'Violeta', color: '#662c9c' },
        { name: 'Dorado', color: '#ceb631' },
        { name: 'Plateado', color: '#c0c0c0' },
        { name: 'Negro', color: '#494545' },
      ]
    };
    this.changeImage = this.changeImage.bind(this);
    this.updateActiveButton = this.updateActiveButton.bind(this);
  }

  changeImage(index) {
    this.setState({ currentIndex: index });
    this.updateActiveButton(index);
  }

  updateActiveButton(index) {
    const activeButton = document.querySelector(".cambioColor a.active");
    if (activeButton) {
      activeButton.classList.remove("active");
    }
    const newActiveButton = document.querySelector(`.cambioColor a[data-index="${index}"]`);
    newActiveButton.classList.add("active");
    this.setState({ currentColor: this.state.colors[index].name });
  }

  render() {
    const currentImage = this.state.images[this.state.currentIndex];
    const currentColor = this.state.currentColor;
    return (
      <div>
        <div className="cambioColor">
          {this.state.colors.map((color, index) => (
            <a
              href="# "
              key={index}
              data-index={index}
              style={{ backgroundColor: color.color }}
              className={this.state.currentIndex === index ? 'active' : ''}
              onClick={(e) => { e.preventDefault(); this.changeImage(index) }}>
              {this.state.currentIndex === index && <h2>{currentColor}</h2>}
            </a>
          ))}
        </div>
        <div id="imageContainer">
          <img id="currentImage" src={currentImage} alt="celulares" style={{ display: 'block', margin: '0 auto' }} />
        </div>
      </div>
    );
  }
}

export default ImageSlider;
