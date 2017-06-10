import React, { Component } from 'react';
import classNames from 'classnames';
import Swiper from 'swiper';
import 'swiper/dist/css/swiper.css';
import RemoveIcon from '../base/icons/RemoveIcon';
import ArrowIcon from '../base/icons/ArrowIcon';
import DateFormatter from '../../utils/DateFormatter';
import Routes from '../../services/Routes';
import Link from '../base/Link';

const firstDayOfWeek = 0;
const lastDayOfWeek = 6;

class Meal extends Component {
    render() {
        const { meal, onRemoveMeal } = this.props;

        return (
            <div className="pes-meal">
                <div className="pes-meal__divider"></div>

                <Link
                    undecorated
                    to={Routes.viewRecipe(meal.recipeId)}
                    className="pes-meal__recipe-name">
                    {meal.recipeName}
                </Link>

                <button
                    onClick={() => onRemoveMeal(meal.id)}
                    className="pes-meal__remove-button">
                    <RemoveIcon />
                </button>
            </div>
        );
    }
}


class DayPlanned extends Component {
    render() {
        const { day, onRemoveMeal } = this.props;
        return (
            <div className="swiper-slide">
                {day.mealDate}
                {day.meals.map(meal => <Meal key={meal.id} meal={meal} onRemoveMeal={onRemoveMeal} />)}
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
        this.onRemoveMeal = this.onRemoveMeal.bind(this);
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
                    {this.props.days.map(day => <DayPlanned key={day.mealDate} day={day} onRemoveMeal={this.onRemoveMeal} />)}
                </div>
            </div>
        );
    }

    onRemoveMeal(mealId) {
        console.log('delete -> ', mealId);
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