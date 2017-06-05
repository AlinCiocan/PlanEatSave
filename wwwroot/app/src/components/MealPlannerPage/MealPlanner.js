import React, { Component } from 'react';
import classNames from 'classnames';
import Swiper from 'swiper';
import 'swiper/dist/css/swiper.css';
import RemoveIcon from '../base/icons/RemoveIcon';
import ArrowIcon from '../base/icons/ArrowIcon';
import DateFormatter from '../../utils/DateFormatter';

const firstDayOfWeek = 0;
const lastDayOfWeek = 6;

class Meal extends Component {
    render() {
        return (
            <div className="pes-meal">
                <div className="pes-meal__divider"></div>

                <button className="pes-meal__recipe-name">{this.props.meal.recipeName}</button>
                <button className="pes-meal__remove-button"><RemoveIcon /></button>
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
            </div>
        );
    }
}

const getSelectedDayIndex = (days, selectedDay) => days.findIndex(day => day.mealDate === selectedDay);

export default class MealPlanner extends Component {
    constructor(props) {
        super(props);

        const { days, selectedDay } = props;
        this.state = { currentDayIndex: getSelectedDayIndex(days, selectedDay) };

        this.goToPreviousDay = this.goToPreviousDay.bind(this);
        this.goToNextDay = this.goToNextDay.bind(this);
    }

    componentDidMount() {
        this.swiper = new Swiper(this.swiperContainer, {
            spaceBetween: 30,
            autoHeight: true,
            calculateHeight: true,
            initialSlide: this.state.currentDayIndex,
            onTransitionEnd: () => {
                // first time is called before swiper being asigned
                if (this.swiper) {
                    const currentDayIndex = this.swiper.activeIndex;
                    const { mealDate } = this.props.days[currentDayIndex];
                    this.props.onDayChange(mealDate);
                    this.setState({ currentDayIndex });
                }
            }
        });
    }

    componentWillReceiveProps(nextProps) {
        if (this.props.selectedDay === nextProps.selectedDay) {
            return;
        }

        const { days, selectedDay } = nextProps;
        this.swiper.slideTo(getSelectedDayIndex(days, selectedDay));
    }

    goToPreviousDay() {
        this.swiper.slidePrev();
    }

    goToNextDay() {
        this.swiper.slideNext();
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
        const currentDay = this.props.days[this.state.currentDayIndex];
        const currentDayName = DateFormatter.getDayNameFromString(currentDay.mealDate);

        return (
            <div className="meal-planner">
                <div className="meal-planner__header">
                    <button
                        className={classNames('pes-transparent-button', 'meal-planner__day-navigation', { 'meal-planner__day-navigation--hidden': this.state.currentDayIndex === firstDayOfWeek })}
                        onClick={this.goToPreviousDay}>
                        <ArrowIcon direction="left" />
                    </button>

                    <div className="meal-planner__selected-day">
                        {currentDayName.toString()}
                    </div>

                    <button
                        className={classNames('pes-transparent-button', 'meal-planner__day-navigation', { 'meal-planner__day-navigation--hidden': this.state.currentDayIndex === lastDayOfWeek })}
                        onClick={this.goToNextDay}>
                        <ArrowIcon />
                    </button>
                </div>

                {this.renderMealCarousel()}
            </div>
        );
    }
}
