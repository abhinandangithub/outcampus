import React, { Fragment, useState, useEffect, useRef } from "react"
import { PublicLayout } from "../layout"
import Link from "next/link"
import { Spinner, Skeleton, Box, Divider } from "@chakra-ui/core"
import { Tabs, TabList, TabPanels, Tab, TabPanel } from "@chakra-ui/core";
import {
    Accordion,
    AccordionItem,
    AccordionHeader,
    AccordionPanel,
    AccordionIcon,
} from "@chakra-ui/core";
import useSWR from "swr"

import LetsGetStarted from "../common/letGetStarted"
import Testimonials from "../common/testimonials"

const YoungLeaders = () => {
    return (
        <PublicLayout title="Outcampus - Young Leaders">
            <YoungLeadersMainHero />
            <FeatureSection />
            <YoungLeadersProgramDetails />
            <FAQSection />
            <Testimonials />
            <LetsGetStarted />
        </PublicLayout>
    )
}


export const YoungLeadersMainHero = () => {
    return (
        <div className="bg-green-500">
            <div className="flex flex-col flex-wrap md:flex-row px-1 md:px-2 justify-center py-10  max-w-screen-xl md:mx-auto">
                <div className="text-left md:text-left md:w-1/2">
                    <span className="text-black text-left text-4xl md:text-4xl lg:6xl font-bold">YOUNG LEADERS</span>
                    {/* Stats section */}
                    <span>
                        <div className="flex flex-col  md:w-full md:block py-1">
                            <div className="block text-left text-2xl">Communication skills, Critical Thinking and Logical Reasoning</div>
                            <div className="text-black w-full">
                                The Young Leaders program helps in the development of a child’s overall personality, thereby providing strong
                                practical orientation to the child and helps in enhancing, building and improving their skills in communication,
                                critical thinking, logical reasoning, creative and design thinking, entrepreneurism, innovation, presentations,
                                team building, leadership, time and finance management, group discussions, interviews, and inter-personal skills.
                            </div>
                            <Link href="/register">
                                <div className="w-full md:w-2/3 bg-yellow-300 py-2 text-center my-4 hover:bg-yellow-500 transition duration-300 self-end">
                                    <span>Start your free Trial</span>
                                </div>
                            </Link>
                        </div>

                    </span>
                </div>
                <div className="text-center md:w-1/2">
                    <img src="/img/hero-boy.svg" className="-mt-16"></img>
                </div>
            </div>
        </div>
    )

}

const PricingConfig = [
    {
        tabTitle: "Age 6 & 7",
        pricingConfig: [
            {
                title: "Basic",
                discountedPrice: "₹6999",
                actualPrice: "₹6999",
                isPopular: false,
                link: "/buyNow?price=6999&age=7",
                features: [
                    { img: "/img/home/green-check.svg", label: "Phonetics - Part I and Grammar" },
                    { img: "/img/home/green-check.svg", label: "Opinion Development and Structuring Thoughts" },
                    { img: "/img/home/green-check.svg", label: "Public Speaking" },
                    { img: "/img/home/green-check.svg", label: "Debate" },
                    { img: "/img/home/green-check.svg", label: "Logic and Reasoning" },
                    { img: "/img/home/green-check.svg", label: "Observational skills" },
                    { img: "/img/home/green-check.svg", label: "Interpretation, Evaluation and Inference" },
                    { img: "/img/home/green-check.svg", label: "Decision Making principles" },
                    { img: "/img/home/green-check.svg", label: "Pattern , Process Sequencing and Recognition" },
                    { img: "/img/home/green-check.svg", label: "Numerical Ability" },
                    { img: "/img/home/green-check.svg", label: "Brain Training" },
                    { img: "/img/home/green-check.svg", label: "Quiz with GK" },
                    { img: "/img/home/green-check.svg", label: "Group Discussion (Current Affairs)" },
                    { img: "/img/home/green-check.svg", label: "Leadership" },
                    { img: "/img/home/green-check.svg", label: "Entrepreneurship" },
                ]
            },
            {
                title: "Intermediate",
                discountedPrice: "₹13999",
                actualPrice: "₹13999",
                isPopular: true,
                link: "/buyNow?price=13999&age=7",
                features: [
                    { img: "/img/home/green-check.svg", label: "Phonetics - Part I and II" },
                    { img: "/img/home/green-check.svg", label: "Grammar" },
                    { img: "/img/home/green-check.svg", label: "Parts of Speech" },
                    { img: "/img/home/green-check.svg", label: "English Language Fluency" },
                    { img: "/img/home/green-check.svg", label: "Opinion Development" },
                    { img: "/img/home/green-check.svg", label: "Imagination and Visualization" },
                    { img: "/img/home/green-check.svg", label: "Public Speaking" },
                    { img: "/img/home/green-check.svg", label: "Expression Building" },
                    { img: "/img/home/green-check.svg", label: "Debate" },
                    { img: "/img/home/green-check.svg", label: "Logic and reasoning" },
                    { img: "/img/home/green-check.svg", label: "Observational skills" },
                    { img: "/img/home/green-check.svg", label: "Interpretation, Evaluation and Inference" },
                    { img: "/img/home/green-check.svg", label: "Pattern, Process Sequencing and Recognition" },
                    { img: "/img/home/green-check.svg", label: "Numerical Ability" },
                    { img: "/img/home/green-check.svg", label: "Brain Training" },
                    { img: "/img/home/green-check.svg", label: "Auditory processing" },
                    { img: "/img/home/green-check.svg", label: "Visual processing" },
                    { img: "/img/home/green-check.svg", label: "Working memory" },
                    { img: "/img/home/green-check.svg", label: "Analytical Thinking" },
                    { img: "/img/home/green-check.svg", label: "Decision Making" },
                    { img: "/img/home/green-check.svg", label: "Quiz with GK" },
                    { img: "/img/home/green-check.svg", label: "Group Discussion" },
                    { img: "/img/home/green-check.svg", label: "Current Affairs and General Awareness" },
                    { img: "/img/home/green-check.svg", label: "Persuasion and Influence" },
                    { img: "/img/home/green-check.svg", label: "Planning and Delivery Skills" },
                    { img: "/img/home/green-check.svg", label: "Time-Management" },
                    { img: "/img/home/green-check.svg", label: "Leadership" },
                    { img: "/img/home/green-check.svg", label: "Entrepreneurship" },
                ]
            },
            {
                title: "Advanced",
                discountedPrice: "₹29999",
                actualPrice: "₹29999",
                isPopular: false,
                link: "/buyNow?price=29999&age=7",
                features: [
                    { img: "/img/home/green-check.svg", label: "Phonetics - Part I, II and III" },
                    { img: "/img/home/green-check.svg", label: "Grammar" },
                    { img: "/img/home/green-check.svg", label: "Parts of Speech" },
                    { img: "/img/home/green-check.svg", label: "English Language Fluency" },
                    { img: "/img/home/green-check.svg", label: "Structuring sentences and Opinion Development" },
                    { img: "/img/home/green-check.svg", label: "Imagination and Visualization" },
                    { img: "/img/home/green-check.svg", label: "Public Speaking" },
                    { img: "/img/home/green-check.svg", label: "Expression Building" },
                    { img: "/img/home/green-check.svg", label: "Debate" },
                    { img: "/img/home/green-check.svg", label: "Brainstorming and lateral thinking" },
                    { img: "/img/home/green-check.svg", label: "Clarifying meaning" },
                    { img: "/img/home/green-check.svg", label: "Summarizing-Making notes and charts" },
                    { img: "/img/home/green-check.svg", label: "Examining ideas/Digging for details" },
                    { img: "/img/home/green-check.svg", label: "Identifying and Analyzing facts and arguments" },
                    { img: "/img/home/green-check.svg", label: "Checking claims and assumptions" },
                    { img: "/img/home/green-check.svg", label: "Critiquing claims and assumptions" },
                    { img: "/img/home/green-check.svg", label: "Questioning claims and assumptions" },
                    { img: "/img/home/green-check.svg", label: "Making a right judgement" },
                    { img: "/img/home/green-check.svg", label: "Arriving at a right solution" },
                    { img: "/img/home/green-check.svg", label: "Appraise. Apply and Defend" },
                    { img: "/img/home/green-check.svg", label: "Drawing conclusion" },
                    { img: "/img/home/green-check.svg", label: "Decision Making" },
                    { img: "/img/home/green-check.svg", label: "Reflective Thinking" },
                    { img: "/img/home/green-check.svg", label: "Observational skills" },
                    { img: "/img/home/green-check.svg", label: "Interpretation, Evaluation and Inference" },
                    { img: "/img/home/green-check.svg", label: "Logic and reasoning" },
                    { img: "/img/home/green-check.svg", label: "Pattern, Process Sequencing and Recognition" },
                    { img: "/img/home/green-check.svg", label: "Numerical Ability" },
                    { img: "/img/home/green-check.svg", label: "Brain Training" },
                    { img: "/img/home/green-check.svg", label: "Memory Training" },
                    { img: "/img/home/green-check.svg", label: "Seeing new possibilities" },
                    { img: "/img/home/green-check.svg", label: "Experimenting and imagining" },
                    { img: "/img/home/green-check.svg", label: "Identifying connections/relationships" },
                    { img: "/img/home/green-check.svg", label: "Combining opposing concepts/elements" },
                    { img: "/img/home/green-check.svg", label: "Forming mental images/sensations/concepts" },
                    { img: "/img/home/green-check.svg", label: "Working memory" },
                    { img: "/img/home/green-check.svg", label: "Gathering facts and evidence" },
                    { img: "/img/home/green-check.svg", label: "Breaking complex information into smaller pieces" },
                    { img: "/img/home/green-check.svg", label: "Evaluating viewpoints and opinions" },
                    { img: "/img/home/green-check.svg", label: "Identifying patterns and cause and effect" },
                    { img: "/img/home/green-check.svg", label: "Eliminating extraneous information" },
                    { img: "/img/home/green-check.svg", label: "Drawing and testing conclusions" },
                    { img: "/img/home/green-check.svg", label: "Assessing new knowledge" },
                    { img: "/img/home/green-check.svg", label: "Social cooperation" },
                    { img: "/img/home/green-check.svg", label: "Team Work" },
                    { img: "/img/home/green-check.svg", label: "Collaboration with Community" },
                    { img: "/img/home/green-check.svg", label: "Conflict Resolution" },
                    { img: "/img/home/green-check.svg", label: "Self Concept" },
                    { img: "/img/home/green-check.svg", label: "Emotional intelligence" },
                    { img: "/img/home/green-check.svg", label: "Quiz with GK" },
                    { img: "/img/home/green-check.svg", label: "Group Discussion" },
                    { img: "/img/home/green-check.svg", label: "Current Affairs and General Awareness" },
                    { img: "/img/home/green-check.svg", label: "Persuasion and Influence" },
                    { img: "/img/home/green-check.svg", label: "Planning and Delivery Skills" },
                    { img: "/img/home/green-check.svg", label: "Time-Management" },
                    { img: "/img/home/green-check.svg", label: "Finance-Management" },
                    { img: "/img/home/green-check.svg", label: "Leadership" },
                    { img: "/img/home/green-check.svg", label: "Entrepreneurship" },
                ]
            },
        ]
    },
    {
        tabTitle: "Age 8 & 9",
        pricingConfig: [
            {
                title: "Basic",
                discountedPrice: "₹6999",
                actualPrice: "₹6999",
                isPopular: false,
                link: "/buyNow?price=6999&age=9",
                features: [
                    { img: "/img/home/green-check.svg", label: "Phonetics - Part I and Grammar" },
                    { img: "/img/home/green-check.svg", label: "Opinion Development and Structuring Thoughts" },
                    { img: "/img/home/green-check.svg", label: "Public Speaking" },
                    { img: "/img/home/green-check.svg", label: "Debate" },
                    { img: "/img/home/green-check.svg", label: "Logic and Reasoning" },
                    { img: "/img/home/green-check.svg", label: "Observational skills" },
                    { img: "/img/home/green-check.svg", label: "Interpretation, Evaluation and Inference" },
                    { img: "/img/home/green-check.svg", label: "Decision Making principles" },
                    { img: "/img/home/green-check.svg", label: "Pattern , Process Sequencing and Recognition" },
                    { img: "/img/home/green-check.svg", label: "Numerical Ability" },
                    { img: "/img/home/green-check.svg", label: "Brain Training" },
                    { img: "/img/home/green-check.svg", label: "Quiz with GK" },
                    { img: "/img/home/green-check.svg", label: "Group Discussion (Current Affairs)" },
                    { img: "/img/home/green-check.svg", label: "Leadership" },
                    { img: "/img/home/green-check.svg", label: "Entrepreneurship" },
                ]
            },
            {
                title: "Intermediate",
                discountedPrice: "₹13999",
                actualPrice: "₹13999",
                isPopular: true,
                link: "/buyNow?price=13999&age=9",
                features: [
                    { img: "/img/home/green-check.svg", label: "Phonetics - Part I and II" },
                    { img: "/img/home/green-check.svg", label: "Grammar" },
                    { img: "/img/home/green-check.svg", label: "Parts of Speech" },
                    { img: "/img/home/green-check.svg", label: "English Language Fluency" },
                    { img: "/img/home/green-check.svg", label: "Opinion Development" },
                    { img: "/img/home/green-check.svg", label: "Imagination and Visualization" },
                    { img: "/img/home/green-check.svg", label: "Public Speaking" },
                    { img: "/img/home/green-check.svg", label: "Expression Building" },
                    { img: "/img/home/green-check.svg", label: "Debate" },
                    { img: "/img/home/green-check.svg", label: "Logic and reasoning" },
                    { img: "/img/home/green-check.svg", label: "Observational skills" },
                    { img: "/img/home/green-check.svg", label: "Interpretation, Evaluation and Inference" },
                    { img: "/img/home/green-check.svg", label: "Pattern, Process Sequencing and Recognition" },
                    { img: "/img/home/green-check.svg", label: "Numerical Ability" },
                    { img: "/img/home/green-check.svg", label: "Brain Training" },
                    { img: "/img/home/green-check.svg", label: "Auditory processing" },
                    { img: "/img/home/green-check.svg", label: "Visual processing" },
                    { img: "/img/home/green-check.svg", label: "Working memory" },
                    { img: "/img/home/green-check.svg", label: "Analytical Thinking" },
                    { img: "/img/home/green-check.svg", label: "Decision Making" },
                    { img: "/img/home/green-check.svg", label: "Quiz with GK" },
                    { img: "/img/home/green-check.svg", label: "Group Discussion" },
                    { img: "/img/home/green-check.svg", label: "Current Affairs and General Awareness" },
                    { img: "/img/home/green-check.svg", label: "Persuasion and Influence" },
                    { img: "/img/home/green-check.svg", label: "Planning and Delivery Skills" },
                    { img: "/img/home/green-check.svg", label: "Time-Management" },
                    { img: "/img/home/green-check.svg", label: "Leadership" },
                    { img: "/img/home/green-check.svg", label: "Entrepreneurship" },
                ]
            },
            {
                title: "Advanced",
                discountedPrice: "₹29999",
                actualPrice: "₹29999",
                isPopular: false,
                link: "/buyNow?price=29999&age=9",
                features: [
                    { img: "/img/home/green-check.svg", label: "Phonetics - Part I, II and III" },
                    { img: "/img/home/green-check.svg", label: "Grammar" },
                    { img: "/img/home/green-check.svg", label: "Parts of Speech" },
                    { img: "/img/home/green-check.svg", label: "English Language Fluency" },
                    { img: "/img/home/green-check.svg", label: "Structuring sentences and Opinion Development" },
                    { img: "/img/home/green-check.svg", label: "Imagination and Visualization" },
                    { img: "/img/home/green-check.svg", label: "Public Speaking" },
                    { img: "/img/home/green-check.svg", label: "Expression Building" },
                    { img: "/img/home/green-check.svg", label: "Debate" },
                    { img: "/img/home/green-check.svg", label: "Brainstorming and lateral thinking" },
                    { img: "/img/home/green-check.svg", label: "Clarifying meaning" },
                    { img: "/img/home/green-check.svg", label: "Summarizing-Making notes and charts" },
                    { img: "/img/home/green-check.svg", label: "Examining ideas/Digging for details" },
                    { img: "/img/home/green-check.svg", label: "Identifying and Analyzing facts and arguments" },
                    { img: "/img/home/green-check.svg", label: "Checking claims and assumptions" },
                    { img: "/img/home/green-check.svg", label: "Critiquing claims and assumptions" },
                    { img: "/img/home/green-check.svg", label: "Questioning claims and assumptions" },
                    { img: "/img/home/green-check.svg", label: "Making a right judgement" },
                    { img: "/img/home/green-check.svg", label: "Arriving at a right solution" },
                    { img: "/img/home/green-check.svg", label: "Appraise. Apply and Defend" },
                    { img: "/img/home/green-check.svg", label: "Drawing conclusion" },
                    { img: "/img/home/green-check.svg", label: "Decision Making" },
                    { img: "/img/home/green-check.svg", label: "Reflective Thinking" },
                    { img: "/img/home/green-check.svg", label: "Observational skills" },
                    { img: "/img/home/green-check.svg", label: "Interpretation, Evaluation and Inference" },
                    { img: "/img/home/green-check.svg", label: "Logic and reasoning" },
                    { img: "/img/home/green-check.svg", label: "Pattern, Process Sequencing and Recognition" },
                    { img: "/img/home/green-check.svg", label: "Numerical Ability" },
                    { img: "/img/home/green-check.svg", label: "Brain Training" },
                    { img: "/img/home/green-check.svg", label: "Memory Training" },
                    { img: "/img/home/green-check.svg", label: "Seeing new possibilities" },
                    { img: "/img/home/green-check.svg", label: "Experimenting and imagining" },
                    { img: "/img/home/green-check.svg", label: "Identifying connections/relationships" },
                    { img: "/img/home/green-check.svg", label: "Combining opposing concepts/elements" },
                    { img: "/img/home/green-check.svg", label: "Forming mental images/sensations/concepts" },
                    { img: "/img/home/green-check.svg", label: "Working memory" },
                    { img: "/img/home/green-check.svg", label: "Gathering facts and evidence" },
                    { img: "/img/home/green-check.svg", label: "Breaking complex information into smaller pieces" },
                    { img: "/img/home/green-check.svg", label: "Evaluating viewpoints and opinions" },
                    { img: "/img/home/green-check.svg", label: "Identifying patterns and cause and effect" },
                    { img: "/img/home/green-check.svg", label: "Eliminating extraneous information" },
                    { img: "/img/home/green-check.svg", label: "Drawing and testing conclusions" },
                    { img: "/img/home/green-check.svg", label: "Assessing new knowledge" },
                    { img: "/img/home/green-check.svg", label: "Social cooperation" },
                    { img: "/img/home/green-check.svg", label: "Team Work" },
                    { img: "/img/home/green-check.svg", label: "Collaboration with Community" },
                    { img: "/img/home/green-check.svg", label: "Conflict Resolution" },
                    { img: "/img/home/green-check.svg", label: "Self Concept" },
                    { img: "/img/home/green-check.svg", label: "Emotional intelligence" },
                    { img: "/img/home/green-check.svg", label: "Quiz with GK" },
                    { img: "/img/home/green-check.svg", label: "Group Discussion" },
                    { img: "/img/home/green-check.svg", label: "Current Affairs and General Awareness" },
                    { img: "/img/home/green-check.svg", label: "Persuasion and Influence" },
                    { img: "/img/home/green-check.svg", label: "Planning and Delivery Skills" },
                    { img: "/img/home/green-check.svg", label: "Time-Management" },
                    { img: "/img/home/green-check.svg", label: "Finance-Management" },
                    { img: "/img/home/green-check.svg", label: "Leadership" },
                    { img: "/img/home/green-check.svg", label: "Entrepreneurship" },
                ]
            },
        ]
    },
    {
        tabTitle: "Age 10, 11 & 12",
        pricingConfig: [
            {
                title: "Basic",
                discountedPrice: "₹6999",
                actualPrice: "₹6999",
                isPopular: false,
                link: "/buyNow?price=6999&age=12",
                features: [
                    { img: "/img/home/green-check.svg", label: "Phonetics - Part I and Grammar" },
                    { img: "/img/home/green-check.svg", label: "Opinion Development and Structuring Thoughts" },
                    { img: "/img/home/green-check.svg", label: "Public Speaking" },
                    { img: "/img/home/green-check.svg", label: "Debate" },
                    { img: "/img/home/green-check.svg", label: "Logic and Reasoning" },
                    { img: "/img/home/green-check.svg", label: "Observational skills" },
                    { img: "/img/home/green-check.svg", label: "Interpretation, Evaluation and Inference" },
                    { img: "/img/home/green-check.svg", label: "Decision Making principles" },
                    { img: "/img/home/green-check.svg", label: "Pattern , Process Sequencing and Recognition" },
                    { img: "/img/home/green-check.svg", label: "Numerical Ability" },
                    { img: "/img/home/green-check.svg", label: "Brain Training" },
                    { img: "/img/home/green-check.svg", label: "Quiz with GK" },
                    { img: "/img/home/green-check.svg", label: "Group Discussion (Current Affairs)" },
                    { img: "/img/home/green-check.svg", label: "Leadership" },
                    { img: "/img/home/green-check.svg", label: "Entrepreneurship" },
                ]
            },
            {
                title: "Intermediate",
                discountedPrice: "₹13999",
                actualPrice: "₹13999",
                isPopular: true,
                link: "/buyNow?price=13999&age=12",
                features: [
                    { img: "/img/home/green-check.svg", label: "Phonetics - Part I and II" },
                    { img: "/img/home/green-check.svg", label: "Grammar" },
                    { img: "/img/home/green-check.svg", label: "Parts of Speech" },
                    { img: "/img/home/green-check.svg", label: "English Language Fluency" },
                    { img: "/img/home/green-check.svg", label: "Opinion Development" },
                    { img: "/img/home/green-check.svg", label: "Imagination and Visualization" },
                    { img: "/img/home/green-check.svg", label: "Public Speaking" },
                    { img: "/img/home/green-check.svg", label: "Expression Building" },
                    { img: "/img/home/green-check.svg", label: "Debate" },
                    { img: "/img/home/green-check.svg", label: "Logic and reasoning" },
                    { img: "/img/home/green-check.svg", label: "Observational skills" },
                    { img: "/img/home/green-check.svg", label: "Interpretation, Evaluation and Inference" },
                    { img: "/img/home/green-check.svg", label: "Pattern, Process Sequencing and Recognition" },
                    { img: "/img/home/green-check.svg", label: "Numerical Ability" },
                    { img: "/img/home/green-check.svg", label: "Brain Training" },
                    { img: "/img/home/green-check.svg", label: "Auditory processing" },
                    { img: "/img/home/green-check.svg", label: "Visual processing" },
                    { img: "/img/home/green-check.svg", label: "Working memory" },
                    { img: "/img/home/green-check.svg", label: "Analytical Thinking" },
                    { img: "/img/home/green-check.svg", label: "Decision Making" },
                    { img: "/img/home/green-check.svg", label: "Quiz with GK" },
                    { img: "/img/home/green-check.svg", label: "Group Discussion" },
                    { img: "/img/home/green-check.svg", label: "Current Affairs and General Awareness" },
                    { img: "/img/home/green-check.svg", label: "Persuasion and Influence" },
                    { img: "/img/home/green-check.svg", label: "Planning and Delivery Skills" },
                    { img: "/img/home/green-check.svg", label: "Time-Management" },
                    { img: "/img/home/green-check.svg", label: "Leadership" },
                    { img: "/img/home/green-check.svg", label: "Entrepreneurship" },
                ]
            },
            {
                title: "Advanced",
                discountedPrice: "₹29999",
                actualPrice: "₹29999",
                isPopular: false,
                link: "/buyNow?price=29999&age=12",
                features: [
                    { img: "/img/home/green-check.svg", label: "Phonetics - Part I, II and III" },
                    { img: "/img/home/green-check.svg", label: "Grammar" },
                    { img: "/img/home/green-check.svg", label: "Parts of Speech" },
                    { img: "/img/home/green-check.svg", label: "English Language Fluency" },
                    { img: "/img/home/green-check.svg", label: "Structuring sentences and Opinion Development" },
                    { img: "/img/home/green-check.svg", label: "Imagination and Visualization" },
                    { img: "/img/home/green-check.svg", label: "Public Speaking" },
                    { img: "/img/home/green-check.svg", label: "Expression Building" },
                    { img: "/img/home/green-check.svg", label: "Debate" },
                    { img: "/img/home/green-check.svg", label: "Brainstorming and lateral thinking" },
                    { img: "/img/home/green-check.svg", label: "Clarifying meaning" },
                    { img: "/img/home/green-check.svg", label: "Summarizing-Making notes and charts" },
                    { img: "/img/home/green-check.svg", label: "Examining ideas/Digging for details" },
                    { img: "/img/home/green-check.svg", label: "Identifying and Analyzing facts and arguments" },
                    { img: "/img/home/green-check.svg", label: "Checking claims and assumptions" },
                    { img: "/img/home/green-check.svg", label: "Critiquing claims and assumptions" },
                    { img: "/img/home/green-check.svg", label: "Questioning claims and assumptions" },
                    { img: "/img/home/green-check.svg", label: "Making a right judgement" },
                    { img: "/img/home/green-check.svg", label: "Arriving at a right solution" },
                    { img: "/img/home/green-check.svg", label: "Appraise. Apply and Defend" },
                    { img: "/img/home/green-check.svg", label: "Drawing conclusion" },
                    { img: "/img/home/green-check.svg", label: "Decision Making" },
                    { img: "/img/home/green-check.svg", label: "Reflective Thinking" },
                    { img: "/img/home/green-check.svg", label: "Observational skills" },
                    { img: "/img/home/green-check.svg", label: "Interpretation, Evaluation and Inference" },
                    { img: "/img/home/green-check.svg", label: "Logic and reasoning" },
                    { img: "/img/home/green-check.svg", label: "Pattern, Process Sequencing and Recognition" },
                    { img: "/img/home/green-check.svg", label: "Numerical Ability" },
                    { img: "/img/home/green-check.svg", label: "Brain Training" },
                    { img: "/img/home/green-check.svg", label: "Memory Training" },
                    { img: "/img/home/green-check.svg", label: "Seeing new possibilities" },
                    { img: "/img/home/green-check.svg", label: "Experimenting and imagining" },
                    { img: "/img/home/green-check.svg", label: "Identifying connections/relationships" },
                    { img: "/img/home/green-check.svg", label: "Combining opposing concepts/elements" },
                    { img: "/img/home/green-check.svg", label: "Forming mental images/sensations/concepts" },
                    { img: "/img/home/green-check.svg", label: "Working memory" },
                    { img: "/img/home/green-check.svg", label: "Gathering facts and evidence" },
                    { img: "/img/home/green-check.svg", label: "Breaking complex information into smaller pieces" },
                    { img: "/img/home/green-check.svg", label: "Evaluating viewpoints and opinions" },
                    { img: "/img/home/green-check.svg", label: "Identifying patterns and cause and effect" },
                    { img: "/img/home/green-check.svg", label: "Eliminating extraneous information" },
                    { img: "/img/home/green-check.svg", label: "Drawing and testing conclusions" },
                    { img: "/img/home/green-check.svg", label: "Assessing new knowledge" },
                    { img: "/img/home/green-check.svg", label: "Social cooperation" },
                    { img: "/img/home/green-check.svg", label: "Team Work" },
                    { img: "/img/home/green-check.svg", label: "Collaboration with Community" },
                    { img: "/img/home/green-check.svg", label: "Conflict Resolution" },
                    { img: "/img/home/green-check.svg", label: "Self Concept" },
                    { img: "/img/home/green-check.svg", label: "Emotional intelligence" },
                    { img: "/img/home/green-check.svg", label: "Quiz with GK" },
                    { img: "/img/home/green-check.svg", label: "Group Discussion" },
                    { img: "/img/home/green-check.svg", label: "Current Affairs and General Awareness" },
                    { img: "/img/home/green-check.svg", label: "Persuasion and Influence" },
                    { img: "/img/home/green-check.svg", label: "Planning and Delivery Skills" },
                    { img: "/img/home/green-check.svg", label: "Time-Management" },
                    { img: "/img/home/green-check.svg", label: "Finance-Management" },
                    { img: "/img/home/green-check.svg", label: "Leadership" },
                    { img: "/img/home/green-check.svg", label: "Entrepreneurship" },
                ]
            },
        ]
    },
    {
        tabTitle: "Age 13 & 14",
        pricingConfig: [
            {
                title: "Basic",
                discountedPrice: "₹6999",
                actualPrice: "₹6999",
                isPopular: false,
                link: "/buyNow?price=6999&age=14",
                features: [
                    { img: "/img/home/green-check.svg", label: "Phonetics - Part I and Grammar" },
                    { img: "/img/home/green-check.svg", label: "Opinion Development and Structuring Thoughts" },
                    { img: "/img/home/green-check.svg", label: "Public Speaking" },
                    { img: "/img/home/green-check.svg", label: "Debate" },
                    { img: "/img/home/green-check.svg", label: "Logic and Reasoning" },
                    { img: "/img/home/green-check.svg", label: "Observational skills" },
                    { img: "/img/home/green-check.svg", label: "Interpretation, Evaluation and Inference" },
                    { img: "/img/home/green-check.svg", label: "Decision Making principles" },
                    { img: "/img/home/green-check.svg", label: "Pattern , Process Sequencing and Recognition" },
                    { img: "/img/home/green-check.svg", label: "Numerical Ability" },
                    { img: "/img/home/green-check.svg", label: "Brain Training" },
                    { img: "/img/home/green-check.svg", label: "Quiz with GK" },
                    { img: "/img/home/green-check.svg", label: "Group Discussion (Current Affairs)" },
                    { img: "/img/home/green-check.svg", label: "Leadership" },
                    { img: "/img/home/green-check.svg", label: "Entrepreneurship" },
                ]
            },
            {
                title: "Intermediate",
                discountedPrice: "₹13999",
                actualPrice: "₹13999",
                isPopular: true,
                link: "/buyNow?price=13999&age=14",
                features: [
                    { img: "/img/home/green-check.svg", label: "Phonetics - Part I and II" },
                    { img: "/img/home/green-check.svg", label: "Grammar" },
                    { img: "/img/home/green-check.svg", label: "Parts of Speech" },
                    { img: "/img/home/green-check.svg", label: "English Language Fluency" },
                    { img: "/img/home/green-check.svg", label: "Opinion Development" },
                    { img: "/img/home/green-check.svg", label: "Imagination and Visualization" },
                    { img: "/img/home/green-check.svg", label: "Public Speaking" },
                    { img: "/img/home/green-check.svg", label: "Expression Building" },
                    { img: "/img/home/green-check.svg", label: "Debate" },
                    { img: "/img/home/green-check.svg", label: "Logic and reasoning" },
                    { img: "/img/home/green-check.svg", label: "Observational skills" },
                    { img: "/img/home/green-check.svg", label: "Interpretation, Evaluation and Inference" },
                    { img: "/img/home/green-check.svg", label: "Pattern, Process Sequencing and Recognition" },
                    { img: "/img/home/green-check.svg", label: "Numerical Ability" },
                    { img: "/img/home/green-check.svg", label: "Brain Training" },
                    { img: "/img/home/green-check.svg", label: "Auditory processing" },
                    { img: "/img/home/green-check.svg", label: "Visual processing" },
                    { img: "/img/home/green-check.svg", label: "Working memory" },
                    { img: "/img/home/green-check.svg", label: "Analytical Thinking" },
                    { img: "/img/home/green-check.svg", label: "Decision Making" },
                    { img: "/img/home/green-check.svg", label: "Quiz with GK" },
                    { img: "/img/home/green-check.svg", label: "Group Discussion" },
                    { img: "/img/home/green-check.svg", label: "Current Affairs and General Awareness" },
                    { img: "/img/home/green-check.svg", label: "Persuasion and Influence" },
                    { img: "/img/home/green-check.svg", label: "Planning and Delivery Skills" },
                    { img: "/img/home/green-check.svg", label: "Time-Management" },
                    { img: "/img/home/green-check.svg", label: "Leadership" },
                    { img: "/img/home/green-check.svg", label: "Entrepreneurship" },
                ]
            },
            {
                title: "Advanced",
                discountedPrice: "₹29999",
                actualPrice: "₹29999",
                isPopular: false,
                link: "/buyNow?price=29999&age=14",
                features: [
                    { img: "/img/home/green-check.svg", label: "Phonetics - Part I, II and III" },
                    { img: "/img/home/green-check.svg", label: "Grammar" },
                    { img: "/img/home/green-check.svg", label: "Parts of Speech" },
                    { img: "/img/home/green-check.svg", label: "English Language Fluency" },
                    { img: "/img/home/green-check.svg", label: "Structuring sentences and Opinion Development" },
                    { img: "/img/home/green-check.svg", label: "Imagination and Visualization" },
                    { img: "/img/home/green-check.svg", label: "Public Speaking" },
                    { img: "/img/home/green-check.svg", label: "Expression Building" },
                    { img: "/img/home/green-check.svg", label: "Debate" },
                    { img: "/img/home/green-check.svg", label: "Brainstorming and lateral thinking" },
                    { img: "/img/home/green-check.svg", label: "Clarifying meaning" },
                    { img: "/img/home/green-check.svg", label: "Summarizing-Making notes and charts" },
                    { img: "/img/home/green-check.svg", label: "Examining ideas/Digging for details" },
                    { img: "/img/home/green-check.svg", label: "Identifying and Analyzing facts and arguments" },
                    { img: "/img/home/green-check.svg", label: "Checking claims and assumptions" },
                    { img: "/img/home/green-check.svg", label: "Critiquing claims and assumptions" },
                    { img: "/img/home/green-check.svg", label: "Questioning claims and assumptions" },
                    { img: "/img/home/green-check.svg", label: "Making a right judgement" },
                    { img: "/img/home/green-check.svg", label: "Arriving at a right solution" },
                    { img: "/img/home/green-check.svg", label: "Appraise. Apply and Defend" },
                    { img: "/img/home/green-check.svg", label: "Drawing conclusion" },
                    { img: "/img/home/green-check.svg", label: "Decision Making" },
                    { img: "/img/home/green-check.svg", label: "Reflective Thinking" },
                    { img: "/img/home/green-check.svg", label: "Observational skills" },
                    { img: "/img/home/green-check.svg", label: "Interpretation, Evaluation and Inference" },
                    { img: "/img/home/green-check.svg", label: "Logic and reasoning" },
                    { img: "/img/home/green-check.svg", label: "Pattern, Process Sequencing and Recognition" },
                    { img: "/img/home/green-check.svg", label: "Numerical Ability" },
                    { img: "/img/home/green-check.svg", label: "Brain Training" },
                    { img: "/img/home/green-check.svg", label: "Memory Training" },
                    { img: "/img/home/green-check.svg", label: "Seeing new possibilities" },
                    { img: "/img/home/green-check.svg", label: "Experimenting and imagining" },
                    { img: "/img/home/green-check.svg", label: "Identifying connections/relationships" },
                    { img: "/img/home/green-check.svg", label: "Combining opposing concepts/elements" },
                    { img: "/img/home/green-check.svg", label: "Forming mental images/sensations/concepts" },
                    { img: "/img/home/green-check.svg", label: "Working memory" },
                    { img: "/img/home/green-check.svg", label: "Gathering facts and evidence" },
                    { img: "/img/home/green-check.svg", label: "Breaking complex information into smaller pieces" },
                    { img: "/img/home/green-check.svg", label: "Evaluating viewpoints and opinions" },
                    { img: "/img/home/green-check.svg", label: "Identifying patterns and cause and effect" },
                    { img: "/img/home/green-check.svg", label: "Eliminating extraneous information" },
                    { img: "/img/home/green-check.svg", label: "Drawing and testing conclusions" },
                    { img: "/img/home/green-check.svg", label: "Assessing new knowledge" },
                    { img: "/img/home/green-check.svg", label: "Social cooperation" },
                    { img: "/img/home/green-check.svg", label: "Team Work" },
                    { img: "/img/home/green-check.svg", label: "Collaboration with Community" },
                    { img: "/img/home/green-check.svg", label: "Conflict Resolution" },
                    { img: "/img/home/green-check.svg", label: "Self Concept" },
                    { img: "/img/home/green-check.svg", label: "Emotional intelligence" },
                    { img: "/img/home/green-check.svg", label: "Quiz with GK" },
                    { img: "/img/home/green-check.svg", label: "Group Discussion" },
                    { img: "/img/home/green-check.svg", label: "Current Affairs and General Awareness" },
                    { img: "/img/home/green-check.svg", label: "Persuasion and Influence" },
                    { img: "/img/home/green-check.svg", label: "Planning and Delivery Skills" },
                    { img: "/img/home/green-check.svg", label: "Time-Management" },
                    { img: "/img/home/green-check.svg", label: "Finance-Management" },
                    { img: "/img/home/green-check.svg", label: "Leadership" },
                    { img: "/img/home/green-check.svg", label: "Entrepreneurship" },
                ]
            },
        ]


    },

]

export const FeatureSection = () => {
    return (
        <div className="bg-gray-200">
            <div className="flex flex-col flex-wrap md:flex-row px-1 md:px-2 justify-center py-10  max-w-screen-xl md:mx-auto">
                <div className="flex w-full justify-center">
                    <div className="flex flex-row flex-wrap md:flex-row md:space-x-16 bg-white py-8  w-10/12 justify-center -my-24 rounded-md">
                        <div className="flex flex-col justify-center w-1/2 md:w-1/6">
                            <span className="flex w-20 justify-center h-32 md:w-auto md:h-40 mx-auto"><img className=" self-center" src="/img/young-speakers/360.svg"></img> </span>
                            <span className="text-center text-sm md:text-lg h-20 ">360 degree personality development.</span>
                        </div>
                        <div className="flex flex-col justify-center w-1/2 md:w-1/6">
                            <span className="flex w-20 justify-center h-32 md:w-auto md:h-40 mx-auto"><img className=" self-center" src="/img/young-speakers/young-leaders.svg"></img> </span>
                            <span className="text-center text-sm md:text-lg h-20 ">200+ Young Leaders Created</span>
                        </div>
                        <div className="flex flex-col justify-center w-1/2 md:w-1/6">
                            <span className="flex w-20 h-32 md:w-auto md:h-40 mx-auto"><img src="/img/young-thinkers/gears.svg"></img> </span>
                            <span className="text-center text-sm md:text-lg h-20 ">Improve your mental ability</span>
                        </div>
                        <div className="flex flex-col justify-center w-1/2 md:w-1/6">
                            <span className="flex w-20 h-32 md:w-auto md:h-40 mx-auto"><img src="/img/young-thinkers/equation.svg"></img> </span>
                            <span className="text-center text-sm md:text-lg h-20 ">Improve your maths skills</span>
                        </div>

                    </div>
                </div>

                <div className="h-auto w-full mt-40">
                    <PricingTabs pricing={PricingConfig} />
                </div>
            </div>
        </div>
    )
}

export const PricingPayment = () => {
    return (
        <PricingTabs pricing={PricingConfig} />
    )
}

export const YoungLeadersProgramDetails = () => {
    return (
        <div className="bg-green-600">
            <div className="flex flex-col flex-wrap md:flex-row px-1 md:px-2 justify-center pt-10  max-w-screen-xl md:mx-auto">
                <div className="flex flex-col-reverse md:flex-row justify-center">
                    <div className="flex flex-col md:hidden justify-between mt-4 md:mt-20">
                        <Link href="/young-thinkers"><span className="underline text-lg text-center mb-12"></span></Link>
                        <Link href="/register"><span className="my-2 md:my-0 py-2 px-10 bg-yellow-300 text-center hover:bg-yellow-400">Start a free trial</span></Link>
                    </div>
                    <div className="w-full md:w-1/2">
                        <img className="self-center" src="/img/hero-boy.svg"></img>
                    </div>
                    <div className="w-full md:w-1/2">
                        <div className="flex flex-col">
                            <div className="text-4xl font-bold mb-4 text-center md:text-left">
                                Young Leaders
                        </div>
                            <div className="hidden md:block break-words w-10/12">
                                Enroll your child in our award winning “Young Leaders” Program; designed by gold medalists from IIT/IIM and delivered LIVE online by
                                IIT/IIM/PhD/Teach for India alumni, Cambridge CELTA® certified and British Council® experienced teachers. Designed within the New
                                Education Policy 2020 framework, it is India’s 1st structured and comprehensive program that builds foundational capacity in effective
                                communication, critical thinking, logical reasoning and confidence building in kids aged 6-15. Kids are taught “How to Speak” and
                                “How to Think” and structure their thoughts mentally.
                        </div>
                            <div>
                                <div className="flex-row hidden md:flex justify-between mt-10">
                                    <Link href="/young-thinkers">
                                        <span className="underline text-lg hover:cursor-pointer hover:text-xl"></span>
                                    </Link>
                                    <Link href="register"><span className="py-2 px-10 bg-yellow-300 self-end hover:bg-yellow-400">Start a free trial</span></Link>
                                </div>
                            </div>

                        </div>

                    </div>

                </div>

            </div>
        </div>
    )
}

export const FAQSection = () => {
    return (

        <div className="flex flex-col flex-wrap md:flex-row px-1 md:px-2 justify-center py-10  max-w-screen-xl md:mx-auto">
            <div className="flex flex-col md:flex-row w-full h-auto">
                <div className="flex flex-col md:w-1/2 w-full justify-between h-auto">
                    <div className="text-2xl font-bold md:font-normal md:text-3xl">
                        Frequently Asked Questions
                    </div>
                    <div className="w-full hidden md:block md:w-1/2">
                        For other questions you can contact us directly on <a href="mailto:info@outcampus.in" className="text-green-500">info@outcampus.in</a>
                    </div>
                </div>
                <div className="w-full md:w-1/2">
                    <Accordion defaultIndex={[0]}>
                        <AccordionItem>
                            <AccordionHeader>
                                <Box flex="1" textAlign="left" className="font-bold">
                                    What is Outcampus ?
                                    </Box>
                                <AccordionIcon />
                            </AccordionHeader>
                            <AccordionPanel pb={4}>
                                Outcampus is an online teaching platform that conducts live sessions and curated courses to facilitate all-round development of children in the age group of 3 to 18
                                </AccordionPanel>
                        </AccordionItem>


                        <AccordionItem>
                            <AccordionHeader>
                                <Box flex="1" textAlign="left" className="font-bold">
                                    How does the Outcampus platform work ?
                                    </Box>
                                <AccordionIcon />
                            </AccordionHeader>
                            <AccordionPanel pb={4}>
                                Outcampus is a one-stop-shop. After signing up on our platform, students can browse and enroll for the courses listed on our platform. The payment for the same is made on our platform during enrollment. At the time of session, the students need to login and “join session” from their dashboards. All communication after class hours (including homework) is done on the Outcampus platform as well.
                                </AccordionPanel>
                        </AccordionItem>


                        <AccordionItem>
                            <AccordionHeader>
                                <Box flex="1" textAlign="left" className="font-bold">
                                    Can I view video recordings of live online classes ?
                                    </Box>
                                <AccordionIcon />
                            </AccordionHeader>
                            <AccordionPanel pb={4}>
                                Video recording of live online classes will be available for enrolled students only. These can be viewed from the course page.
                                </AccordionPanel>
                        </AccordionItem>



                        <AccordionItem>
                            <AccordionHeader>
                                <Box flex="1" textAlign="left" className="font-bold">
                                    Is the Outcampus platform free ?
                                    </Box>
                                <AccordionIcon />
                            </AccordionHeader>
                            <AccordionPanel pb={4}>
                                Yes. Currently we do not charge any commission or platform fees for students or teachers to register on our platform. However, students need to pay for the course enrollment fees for the course of their choice.
                                </AccordionPanel>
                        </AccordionItem>


                        <AccordionItem>
                            <AccordionHeader>
                                <Box flex="1" textAlign="left" className="font-bold">
                                    How do teachers get paid ?
                                    </Box>
                                <AccordionIcon />
                            </AccordionHeader>
                            <AccordionPanel pb={4}>
                                Teachers will be paid for the course after completion of their respective course. The payment will be made within 3 business days of completion of course directly in the preferred mode of payment as specified by the teacher. For teachers based outside India and no Indian bank account, payment will be made via Paypal.
                                </AccordionPanel>
                        </AccordionItem>
                    </Accordion>
                </div>
                <div className="w-full md:hidden mt-4 md:w-1/2">
                    For other questions you can contact us directly on <a href="mailto:info@outcampus.in" className="text-green-500">info@outcampus.in</a>
                </div>
            </div>
        </div>

    )
}

const PricingTabs = (props) => {
    const pricing = props.pricing
    const [tabIndex, setTabIndex] = React.useState(1);

    const handleTabsChange = index => {
        setTabIndex(index);
    };
    const selectedStyle =
    {
        color: "black",
        bg: "white",
        borderBottom: "4px solid",
        borderBottomColor: "green.300",
    }
    return (
        <div className="">
            <Tabs isFitted variant="unstyled" index={tabIndex} onChange={handleTabsChange}>
                <TabList className="bg-green-400 h-16">
                    {/* Render all tabs */}
                    {pricing.map((item, index) => {
                        return (<Tab key={index} _selected={
                            selectedStyle
                        }>{item.tabTitle}</Tab>)
                    })}
                </TabList>
                <TabPanels>
                    {/* Render all tabs panels with pricing content */}
                    {
                        pricing.map((tab, index) => {
                            return (
                                <TabPanel key={index}>
                                    <Pricing priceConfig={tab.pricingConfig} />
                                </TabPanel>)
                        })
                    }

                </TabPanels>
            </Tabs>
        </div >
    )
}



const Pricing = (props) => {
    const priceConfigs = props.priceConfig

    return (
        <div className="flex flex-col md:flex-row justify-between w-full px-2 bg-white">
            {
                priceConfigs.map((priceConfig, index) => {
                    return (
                        <div className="flex flex-col w-full md:flex-col md:w-1/3 my-12 px-4 border-r-2 border-solid">
                            <div className={"text-sm font-light h-5"}>
                                <span className={"" + (priceConfig.isPopular ? "" : " hidden")}> Most Popular</span>
                            </div>
                            <div className="text-2xl">{priceConfig.title}</div>
                            <div>
                                <span className="text-3xl inline">{priceConfig.discountedPrice}</span>
                                {/* <span className="text-lg line-through inline px-4 font-thin">{priceConfig.actualPrice}</span> */}
                            </div>
                            <div className="my-8">
                                <Link href={priceConfig.link} as="/buyNow">
                                    <span className={"py-4 px-16 border-solid border shadow-md border-yellow-300 cursor-pointer " + (priceConfig.isPopular ? "bg-yellow-300" : " bg-yellow-200")}>Buy Now</span>
                                </Link>
                            </div>
                            <Divider />
                            <div>
                                {priceConfig.features.map((value, index) => {
                                    return <ListItem image={value.img} label={value.label} />
                                })}
                            </div>

                        </div>

                    )
                })
            }


        </div>
    )
}

const ListItem = (props) => {
    return (
        <div className="flex">
            <span className="m-1"><img src={props.image}></img> </span>
            <span className="m-1">{props.label}</span>
        </div>
    )
}
export default YoungLeaders