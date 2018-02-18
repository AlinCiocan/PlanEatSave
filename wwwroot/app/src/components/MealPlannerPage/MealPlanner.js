import React, { Component } from 'react';
import classNames from 'classnames';
import Swiper from 'swiper';
import 'swiper/dist/css/swiper.css';
import ArrowIcon from '../base/icons/ArrowIcon';
import DateFormatter from '../../utils/DateFormatter';
import DayPlanned from './DayPlanned';

const firstDayOfWeek = 0;
const lastDayOfWeek = 6;

const getSelectedDayIndex = (days, selectedDay) => days.findIndex(day => day.mealDate === selectedDay);

// TODO-alin: refactor adapt swiper to height of window functionality
const adaptSwiperToHeightOfWindow = () => {
    const swiper = document.getElementsByClassName('swiper-container')[0];
    const windowHeight = Math.max(document.documentElement.clientHeight, window.innerHeight || 0);
    const heightOfHeaderBeforeSwiper = 250;
    swiper.style.minHeight = `${windowHeight-heightOfHeaderBeforeSwiper}px`;
};

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
            // autoHeight: true,
            // calculateHeight: true,
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

        adaptSwiperToHeightOfWindow();
        window.addEventListener("optimizedResize", adaptSwiperToHeightOfWindow);
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
        window.removeEventListener("optimizedResize", adaptSwiperToHeightOfWindow);
        this.swiper.destroy(true);
    }

    renderMealCarousel() {
        return (
            <div className="swiper-container full-height" ref={swiperContainer => { this.swiperContainer = swiperContainer }}>
                <div className="swiper-wrapper full-height">
                    {this.props.days.map(day => <DayPlanned key={day.mealDate} day={day} onRemoveMeal={this.props.onRemoveMeal} />)}
                </div>
            </div>
        );
    }

    render() {
        const currentDay = this.props.days[this.state.currentDayIndex];
        const currentDayName = DateFormatter.getDayNameFromString(currentDay.mealDate);

        return (
            <div className="meal-planner full-height">
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
