import React, { Component } from 'react';
import Swiper from 'swiper';
import 'swiper/dist/css/swiper.css';

class Meal extends Component {
    render() {
        return (
            <div className="planner-item">
                <div className="planner-item-divider"></div>

                <button className="planner-text">{this.props.meal.recipeName}</button>
                <button className="planner-remove"><i className="material-icons">delete_forever</i></button>
            </div>
        );
    }
}


class DayPlanned extends Component {
    render() {
        return (
            <div className="swiper-slide">
                {this.props.day.mealDate}
                {this.props.day.meals.map(meal => <Meal key={meal.id} meal={meal} />)}
                <br />
                <img alt="placeholder img" src="https://placeholdit.imgix.net/~text?txtsize=33&txt=350%C3%97150&w=350&h=150" />
            </div>
        );
    }
}


export default class MealPlanner extends Component {
    componentDidMount() {
        this.swiper = new Swiper(this.swiperContainer, {
            spaceBetween: 30,
            autoHeight: true,
            calculateHeight: true
        });

        this.swiper.on('SlideChangeEnd', () => {
            //this.setState({ selectedDay: this.swiper.activeIndex });
        });
    }

    componentWillUnmount() {
        this.swiper.destroy(true);
    }

    renderMealCarousel() {
        return (
            <div className="swiper-container" ref={swiperContainer => { this.swiperContainer = swiperContainer }}>
                <div className="swiper-wrapper">
                    {this.props.days.map(day => <DayPlanned key={day.mealDate} day={day} />)}
                </div>
            </div>
        );
    }

    render() {
        return (
            <div>
                <h1> Selected day: {this.props.selectedDay.toString()}</h1>

                {this.renderMealCarousel()}
            </div>
        );
    }
}
