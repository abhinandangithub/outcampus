# Changelog

All notable changes to this project will be documented in this file. See [standard-version](https://github.com/conventional-changelog/standard-version) for commit guidelines.

### [0.1.37](https://github.com/Kayr-Technologies-Private-Limited/OutCampus/compare/v0.1.36...v0.1.37) (2020-07-08)


### Bug Fixes

* don't set expiry and verify expiration for JWT ([a6c305d](https://github.com/Kayr-Technologies-Private-Limited/OutCampus/commit/a6c305d8a80632c0584a6efec6c68a18298adf4b))

### [0.1.36](https://github.com/Kayr-Technologies-Private-Limited/OutCampus/compare/v0.1.35...v0.1.36) (2020-07-06)


### Features

* add option to choose whether to add GST to course pricing while adding a new course ([81eba41](https://github.com/Kayr-Technologies-Private-Limited/OutCampus/commit/81eba415f07b45b8f7a3335f7f09358cdbf73c3d))

### [0.1.35](https://github.com/Kayr-Technologies-Private-Limited/OutCampus/compare/v0.1.34...v0.1.35) (2020-07-06)


### Bug Fixes

* change token expiry time to 20 weeks and logout all existing users when they open the site ([b9b321a](https://github.com/Kayr-Technologies-Private-Limited/OutCampus/commit/b9b321a2b495e793950f8b2a30e346eb19ba2175))
* fix GST calculation ([d158516](https://github.com/Kayr-Technologies-Private-Limited/OutCampus/commit/d1585168d1097820e7577a3590c7a03939d1e02e))
* remove check for status on course during enrolment ([46f4b49](https://github.com/Kayr-Technologies-Private-Limited/OutCampus/commit/46f4b49b7055e8abf7bd94f43058a77ef06361f5))
* show last name as avatar initial in student card ([9330f5a](https://github.com/Kayr-Technologies-Private-Limited/OutCampus/commit/9330f5a896102b9eaa7e540434b263d02265d76d))

### [0.1.35] - TO-BE Deployed

### Feature

* International Phone Number Option added to SignUp Teacher, Student, Edit Profile
* Autofill of the previous entered Academy name in the new course form. (This Picks only the last filled Academy name which is not empty)

### [0.1.34](https://github.com/Kayr-Technologies-Private-Limited/OutCampus/compare/v0.1.33...v0.1.34) (2020-07-04)


### Bug Fixes

* don't return completed course in the listing API response ([672a827](https://github.com/Kayr-Technologies-Private-Limited/OutCampus/commit/672a827ce06d38fd9336ed7a50eeaddb6a282dde))

### [0.1.33](https://github.com/Kayr-Technologies-Private-Limited/OutCampus/compare/v0.1.32...v0.1.33) (2020-07-04)


### Features

* add options to cancel and re-instate a course ([88f0417](https://github.com/Kayr-Technologies-Private-Limited/OutCampus/commit/88f0417368af83fc40748cd43121764666f2b6a9))
* signout from google if the user was logged in via google ([f0a876c](https://github.com/Kayr-Technologies-Private-Limited/OutCampus/commit/f0a876cf5bacdda02651f4986c2144cecd645008))


### Bug Fixes

* change no.of.session input to use increment/decrement buttons and reduce title limit to 76 char ([3659f95](https://github.com/Kayr-Technologies-Private-Limited/OutCampus/commit/3659f951e87f0c6c99b77e25d889a8f26c08a9a3))
* disallow course enrollment for completed coruses ([e0dd00e](https://github.com/Kayr-Technologies-Private-Limited/OutCampus/commit/e0dd00e6d3d625be53d4f0325056a4e4ad1a34b2))

### [0.1.32](https://github.com/Kayr-Technologies-Private-Limited/OutCampus/compare/v0.1.31...v0.1.32) (2020-07-03)


### Bug Fixes

* fi login redirection issue when there is no ref ([c766d37](https://github.com/Kayr-Technologies-Private-Limited/OutCampus/commit/c766d371f633d19b18a4257ac6bd93ac29fb70ac))

### [0.1.31](https://github.com/Kayr-Technologies-Private-Limited/OutCampus/compare/v0.1.30...v0.1.31) (2020-07-02)


### Bug Fixes

* fix admin managment and refetching of data on edit/delete ([3768cdb](https://github.com/Kayr-Technologies-Private-Limited/OutCampus/commit/3768cdb7a9ba45418174bf9d14b38ae8e5cdb0ab))

### [0.1.30](https://github.com/Kayr-Technologies-Private-Limited/OutCampus/compare/v0.1.29...v0.1.30) (2020-07-02)


### Features

* alow admins to edit meeting link of sessions ([45c817d](https://github.com/Kayr-Technologies-Private-Limited/OutCampus/commit/45c817d0b9c066906d032db5b18072251653b19c))
* fix students enrolled and session Card issue ([9a2b0e7](https://github.com/Kayr-Technologies-Private-Limited/OutCampus/commit/9a2b0e7f9f1d2b7c56647ed8436d987b1c780e53))


### Bug Fixes

* fix formatting of course summary ([dcfccdf](https://github.com/Kayr-Technologies-Private-Limited/OutCampus/commit/dcfccdf6bb054dd245cfa8e2e7b69b11c0b92e77))
* fix google login flow ([cf3a6bd](https://github.com/Kayr-Technologies-Private-Limited/OutCampus/commit/cf3a6bdd625eed736fb130c248612c5b08af3838))
* fix issues in autologin after social login ([67d7bb0](https://github.com/Kayr-Technologies-Private-Limited/OutCampus/commit/67d7bb0e313b00511d80512fcd476c7eab95ec1e))
* fix session card, add aparna in teachers and remove description in form ([affbbb0](https://github.com/Kayr-Technologies-Private-Limited/OutCampus/commit/affbbb0f6ce130d027a6c7fb1dc448e9f7ce2d6d))
* hotfix enrolment count in course details page ([ae1c6df](https://github.com/Kayr-Technologies-Private-Limited/OutCampus/commit/ae1c6dfaf0129d0685897a61fe57da38c14e5c6e))
* hotfix: Fix autologin to return correct user data ([20cc78d](https://github.com/Kayr-Technologies-Private-Limited/OutCampus/commit/20cc78dade6942b725eb00cce8dbc40fd96408e2))
* hotfix: Show only successful enrolments in count ([9000f75](https://github.com/Kayr-Technologies-Private-Limited/OutCampus/commit/9000f752ab18d9004d1dc763ff83853e05835eb2))
* hotfix: Show user details only when user object exists ([bba63f7](https://github.com/Kayr-Technologies-Private-Limited/OutCampus/commit/bba63f76cd202d5b8015b2e198848f1eb43741b4))
* return user data in case of autologin as well ([7fe87ee](https://github.com/Kayr-Technologies-Private-Limited/OutCampus/commit/7fe87ee9a8e72c54293aa282814804797eb40aaf))

### [0.1.29](https://github.com/Kayr-Technologies-Private-Limited/OutCampus/compare/v0.1.28...v0.1.29) (2020-06-23)


### Features

* return user basic details after login and show them in the sidebar ([7e99d25](https://github.com/Kayr-Technologies-Private-Limited/OutCampus/commit/7e99d2595410a01ae90e6e0e1ddda241fd0b2c2a))


### Bug Fixes

* add a check for slots when enrolling for a course ([87c942b](https://github.com/Kayr-Technologies-Private-Limited/OutCampus/commit/87c942b7c4cfd0ef61c9ba20100c0b304e51a7d2))
* don't show enroll button to creators and admin ([ce00a04](https://github.com/Kayr-Technologies-Private-Limited/OutCampus/commit/ce00a0438885d61f91b98c7be25efe86b5ba10b1))
* hotfix : add correct courseID while enrolling ([61112db](https://github.com/Kayr-Technologies-Private-Limited/OutCampus/commit/61112db9d5f26c69e32f6a14d306caf6d24fc5c5))
* move back to normal imports rather than dynamic ones as it introduces flicker on navigating ([7750e37](https://github.com/Kayr-Technologies-Private-Limited/OutCampus/commit/7750e3799c3e20dd12f062bec645c8bcaaeb56da))
* remove case sensitive imports which breaks in linux ([a243509](https://github.com/Kayr-Technologies-Private-Limited/OutCampus/commit/a24350999b1903bea20e561a70c6574e667fa523))
* send canEdit flag in response to course details API ([c41cc6f](https://github.com/Kayr-Technologies-Private-Limited/OutCampus/commit/c41cc6f7624c68af76de403a67921586585f7098))
* show course details to the creator and admin even if it is unapproved ([05a0539](https://github.com/Kayr-Technologies-Private-Limited/OutCampus/commit/05a0539b02b6b7df6640a6b849fc2ed79667d6be))
* show courses created by teacher in their dashboard ([570b288](https://github.com/Kayr-Technologies-Private-Limited/OutCampus/commit/570b28817775ce861ee7887d3313d100183f2059))
* show join session correctly on the card ([392bc13](https://github.com/Kayr-Technologies-Private-Limited/OutCampus/commit/392bc139d7b3613c3deff15ea3b8d9006b85f694))
* show message to already enrolled users instead of the enroll button ([a149afb](https://github.com/Kayr-Technologies-Private-Limited/OutCampus/commit/a149afb25bc0505b52bee741bee45a5f62b813b4))
* sort sessions by start_time ([59ed781](https://github.com/Kayr-Technologies-Private-Limited/OutCampus/commit/59ed781de63a243c4fe5e2e599204dcf66578417))
* sort sessions by their start_time ([81b91cb](https://github.com/Kayr-Technologies-Private-Limited/OutCampus/commit/81b91cb95112794f52701880bf6552165b357d0b))

### [0.1.28](https://github.com/Kayr-Technologies-Private-Limited/OutCampus/compare/v0.1.27...v0.1.28) (2020-06-23)


### Features

* show students and join session button only to admins/creators and enrolled students ([6556cac](https://github.com/Kayr-Technologies-Private-Limited/OutCampus/commit/6556cac7ca0900ec4b420bb68949b200d04fb8a9))


### Bug Fixes

* fix course creation after changes to listing and details ([a3a84d7](https://github.com/Kayr-Technologies-Private-Limited/OutCampus/commit/a3a84d7c199290d0553b9747d1866de0e55a794b))

### [0.1.27](https://github.com/Kayr-Technologies-Private-Limited/OutCampus/compare/v0.1.26...v0.1.27) (2020-06-20)


### Bug Fixes

* show cover images in correct aspect ratio inside cards ([eda97c7](https://github.com/Kayr-Technologies-Private-Limited/OutCampus/commit/eda97c702040335c1fca7737652719770a1e170e))

### [0.1.26](https://github.com/Kayr-Technologies-Private-Limited/OutCampus/compare/v0.1.25...v0.1.26) (2020-06-19)


### Features

* add join session button on course card inside dashboard when the class is going live/ongoing ([8bb68e1](https://github.com/Kayr-Technologies-Private-Limited/OutCampus/commit/8bb68e1023bd4f2eab2df0a1cbf6fc5e8d386135))


### Bug Fixes

* fix course filtering ([d631eb0](https://github.com/Kayr-Technologies-Private-Limited/OutCampus/commit/d631eb065f85922326cb0b085f91b857d2483837))
* show the toast only 1 second as the redirection happens fast in production machine ([0b01afd](https://github.com/Kayr-Technologies-Private-Limited/OutCampus/commit/0b01afda74f472364dcf02446363604a0142cfeb))

### [0.1.25](https://github.com/Kayr-Technologies-Private-Limited/OutCampus/compare/v0.1.24...v0.1.25) (2020-06-19)

### [0.1.24](https://github.com/Kayr-Technologies-Private-Limited/OutCampus/compare/v0.1.23...v0.1.24) (2020-06-19)


### Features

* allow user to reset password by cicking forgot password link ([555d005](https://github.com/Kayr-Technologies-Private-Limited/OutCampus/commit/555d0053691987c5fe3d72f7317c83830d0f70d5))
* change db schema and add migrations ([27ce4a3](https://github.com/Kayr-Technologies-Private-Limited/OutCampus/commit/27ce4a39e544d8ac4a33ff5e258c0bdf900561bb))
* create table for forgot password ([1be9ae1](https://github.com/Kayr-Technologies-Private-Limited/OutCampus/commit/1be9ae12c9587c93d8601d90250231bf95631a95))
* show 2 fake registrations always ([36c0f82](https://github.com/Kayr-Technologies-Private-Limited/OutCampus/commit/36c0f82eedf9ff16e40c0ffeff84d77adddadb08))


### Bug Fixes

* change all classes to sessions and add validation for min/max inputs ([0b4059d](https://github.com/Kayr-Technologies-Private-Limited/OutCampus/commit/0b4059de94714e94348586293311734c86dbbc85))
* fix course ards on homepage on mobile ([7f8f299](https://github.com/Kayr-Technologies-Private-Limited/OutCampus/commit/7f8f2996c14f8658a32d7e0b4596a72f806cbae8))
* remove increment/decrement arrows in price input ([1834ae3](https://github.com/Kayr-Technologies-Private-Limited/OutCampus/commit/1834ae3bd8767ebc3ab0b410df83c76b9e0b5c35))
* remove spinner on enroll button on login/teacher error ([769ab1e](https://github.com/Kayr-Technologies-Private-Limited/OutCampus/commit/769ab1ef7c8578860198ebbc8e5b613740dec0bf))

### [0.1.23](https://github.com/Kayr-Technologies-Private-Limited/OutCampus/compare/v0.1.22...v0.1.23) (2020-06-17)


### Bug Fixes

* fix course page error ([56e420a](https://github.com/Kayr-Technologies-Private-Limited/OutCampus/commit/56e420add069845cacbd4bcdef5160960298add8))
* limit popular courses to 8 on homepage ([6d75271](https://github.com/Kayr-Technologies-Private-Limited/OutCampus/commit/6d752719fdb56e1e0f9d2d5ce4930cbd791b34d7))
* show course cards in flex-wrap and sort them by session start dates ([feb8d79](https://github.com/Kayr-Technologies-Private-Limited/OutCampus/commit/feb8d79c55b78ae38c1e272b84309e3a903d7c30))
* sort courses by session start date in course page ([0f15c9e](https://github.com/Kayr-Technologies-Private-Limited/OutCampus/commit/0f15c9e9331d21035518940b51c466835ffbe0a3))

### [0.1.22](https://github.com/Kayr-Technologies-Private-Limited/OutCampus/compare/v0.1.21...v0.1.22) (2020-06-16)


### Features

* change conditions while registering ([57bca59](https://github.com/Kayr-Technologies-Private-Limited/OutCampus/commit/57bca59cf525269152edf72b0ca93d5d5f645a1a))
* reduce password strength strictness to have only 8 chars minimum ([cc62346](https://github.com/Kayr-Technologies-Private-Limited/OutCampus/commit/cc623464cc88606750142981e6600142216d5fe1))
* use normal zoom link for VC and add hamburger menu in phone ([1c678de](https://github.com/Kayr-Technologies-Private-Limited/OutCampus/commit/1c678de17739d2b018502f5dc7bfdcbe8e9d1672))


### Bug Fixes

* allow course registrations without phone for free course ([7ec231a](https://github.com/Kayr-Technologies-Private-Limited/OutCampus/commit/7ec231ab09b44b75dd870f57224f066cd14a9746))
* disallow registration of courses when max size is reached (only on frontend) ([9fd1e32](https://github.com/Kayr-Technologies-Private-Limited/OutCampus/commit/9fd1e324894333ca93f75f43dec349716fd31e4d))
* fix course tab filters ([7b37906](https://github.com/Kayr-Technologies-Private-Limited/OutCampus/commit/7b37906396be1e5a0a2249396c8d108f63f8d238))
* fix course tabs in mobile ([1f8492a](https://github.com/Kayr-Technologies-Private-Limited/OutCampus/commit/1f8492a56e200fbfc01486a00c9141c369da3fff))
* fix enrolment flow when there are payment failures and cancellations ([4b11e75](https://github.com/Kayr-Technologies-Private-Limited/OutCampus/commit/4b11e75a37dee5ac43b15b2ed665a90f161964e9))
* fix student role when adding trailing slash ([d2098a4](https://github.com/Kayr-Technologies-Private-Limited/OutCampus/commit/d2098a4bd13ddc12371ad75a76563250b9d4d2f5))
* make button full width ([8527a35](https://github.com/Kayr-Technologies-Private-Limited/OutCampus/commit/8527a35283b9ddc7f4c866a9bc14f878163d6313))
* make phone mandatory only when not signed up via google ([aa1a065](https://github.com/Kayr-Technologies-Private-Limited/OutCampus/commit/aa1a06517489064cfe7deb070b181aa89aa46a63))
* menu issue fix ([484b658](https://github.com/Kayr-Technologies-Private-Limited/OutCampus/commit/484b65851ae67d7762377d8475694fc7104ec29e))

### [0.1.21](https://github.com/Kayr-Technologies-Private-Limited/OutCampus/compare/v0.1.20...v0.1.21) (2020-06-13)


### Features

* add vc and fix various issues ([d77034a](https://github.com/Kayr-Technologies-Private-Limited/OutCampus/commit/d77034a457f287202235f5f4f02cf414f8674dcf))
* allow registrations of 0 priced coursed ([0046b9e](https://github.com/Kayr-Technologies-Private-Limited/OutCampus/commit/0046b9e6bf2919fca4f6680c6827693a076406d2))
* show Join classroom link before 15mins of session start time ([5545b04](https://github.com/Kayr-Technologies-Private-Limited/OutCampus/commit/5545b049a19a905c883224a747c0d7a1fcea7690))


### Bug Fixes

* allow camera and micorphone permissions for zoom iframe ([e2ee62b](https://github.com/Kayr-Technologies-Private-Limited/OutCampus/commit/e2ee62b2ceac87953d7b73f8e6006ed477207709))
* fix 15 min logic ([f527669](https://github.com/Kayr-Technologies-Private-Limited/OutCampus/commit/f527669055e8098a85938e5e35c401b8f15e1d6f))
* fix API response when registering 0 priced courses ([ccc4827](https://github.com/Kayr-Technologies-Private-Limited/OutCampus/commit/ccc4827a2e07ca9879dfc0cadf14aa59c94cdddd))
* fix dates in safari ([9473224](https://github.com/Kayr-Technologies-Private-Limited/OutCampus/commit/9473224168808f9aae9c67bee15cc964acd0bb23))
* fix logout on public layout ([7c9d78e](https://github.com/Kayr-Technologies-Private-Limited/OutCampus/commit/7c9d78e5bf0a9f9d4bb955bab73b35662d31297f))
* fix tabs in course listing ([c08cae1](https://github.com/Kayr-Technologies-Private-Limited/OutCampus/commit/c08cae123c6127e0d3b602eb283e9e69954d48a6))

### [0.1.20](https://github.com/Kayr-Technologies-Private-Limited/OutCampus/compare/v0.1.19...v0.1.20) (2020-06-10)


### Bug Fixes

* show student actions as well and fix logout button ([ab01a40](https://github.com/Kayr-Technologies-Private-Limited/OutCampus/commit/ab01a4087789aaea1bea0db093c89f7a60482d0b))

### [0.1.19](https://github.com/Kayr-Technologies-Private-Limited/OutCampus/compare/v0.1.18...v0.1.19) (2020-06-10)


### Features

* show session and students info in course details page ([b3746c7](https://github.com/Kayr-Technologies-Private-Limited/OutCampus/commit/b3746c737d725d32d464a0760c1472b5f6ed60e5))

### [0.1.18](https://github.com/Kayr-Technologies-Private-Limited/OutCampus/compare/v0.1.17...v0.1.18) (2020-06-10)


### Features

* add new hero image ([947838d](https://github.com/Kayr-Technologies-Private-Limited/OutCampus/commit/947838dee11b61b0d7f37acf9f0f442ea8e13b7e))
* add OG tags and move returnURL to env ([748df2f](https://github.com/Kayr-Technologies-Private-Limited/OutCampus/commit/748df2ff70954b24fa550313b2f49e27bf0aff47))


### Bug Fixes

* fix course listing and details page alignment in mobile ([0a4101b](https://github.com/Kayr-Technologies-Private-Limited/OutCampus/commit/0a4101b61bd8f2ec7fd0c7c1a281c56b30499ceb))
* fix homepage teacher card and course creation form issues ([5df1787](https://github.com/Kayr-Technologies-Private-Limited/OutCampus/commit/5df1787a0cf730e101fe699a905d883d8405215c))
* query for only approved courses instead of asking for not unapproved ([3850b2c](https://github.com/Kayr-Technologies-Private-Limited/OutCampus/commit/3850b2cd7165066ee0e5eb852857f65d1699176b))
* show correct feedback when adding course category and change the logo ([b8ffd03](https://github.com/Kayr-Technologies-Private-Limited/OutCampus/commit/b8ffd03d358daace068fe784a649390711472d21))
* show only approved courses ([2d3d476](https://github.com/Kayr-Technologies-Private-Limited/OutCampus/commit/2d3d4765665bb9a5d70a5b9253d4e094cc42cb75))

### [0.1.17](https://github.com/Kayr-Technologies-Private-Limited/OutCampus/compare/v0.1.16...v0.1.17) (2020-06-10)


### Features

* add new schema migrations ([1460e0d](https://github.com/Kayr-Technologies-Private-Limited/OutCampus/commit/1460e0d160064a5f3f62491e1fdfa70f2a801d3d))

### [0.1.16](https://github.com/Kayr-Technologies-Private-Limited/OutCampus/compare/v0.1.15...v0.1.16) (2020-06-10)


### Features

* add payment gateway flow and change home page design ([d3f17c3](https://github.com/Kayr-Technologies-Private-Limited/OutCampus/commit/d3f17c3ef6a2009596cdbfe1c0242e1a892fca31))
* add tabs in students dashboard and move pg credentials to env variables ([7da35f9](https://github.com/Kayr-Technologies-Private-Limited/OutCampus/commit/7da35f915a42072da6f8bd964b753020a54cd776))
* show find courses in students dashboard that shows course listing ([f17d350](https://github.com/Kayr-Technologies-Private-Limited/OutCampus/commit/f17d350f695b68a09078ec81ce08358accbffe88))


### Bug Fixes

* fix find courses link margin ([82abb01](https://github.com/Kayr-Technologies-Private-Limited/OutCampus/commit/82abb01a4451f5465b9cc2c8d4c5e6c982ea1ee5))

### [0.1.15](https://github.com/Kayr-Technologies-Private-Limited/OutCampus/compare/v0.1.14...v0.1.15) (2020-06-08)


### Bug Fixes

* fix mobile alignment ([d175003](https://github.com/Kayr-Technologies-Private-Limited/OutCampus/commit/d175003cf3af3f26efc93455af3a60e0ecc2bc8d))

### [0.1.14](https://github.com/Kayr-Technologies-Private-Limited/OutCampus/compare/v0.1.13...v0.1.14) (2020-06-08)


### Features

* add value props and whatsapp link ([b26eeff](https://github.com/Kayr-Technologies-Private-Limited/OutCampus/commit/b26eeff34e25a7e0decb016ed4caa8dcbb021f39))

### [0.1.13](https://github.com/Kayr-Technologies-Private-Limited/OutCampus/compare/v0.1.12...v0.1.13) (2020-06-08)


### Features

* add new Google analytics tracking code and other homepage changes ([6cd0c59](https://github.com/Kayr-Technologies-Private-Limited/OutCampus/commit/6cd0c59242f4755f97a1b2e6b4ca7c4ca1df0b03))
* fix homepage ([1ab0106](https://github.com/Kayr-Technologies-Private-Limited/OutCampus/commit/1ab01069e51f72cdbc2b46dea31d2b7d4e084370))

### [0.1.12](https://github.com/Kayr-Technologies-Private-Limited/OutCampus/compare/v0.1.11...v0.1.12) (2020-06-08)


### Features

* make layout responsive ([77f294e](https://github.com/Kayr-Technologies-Private-Limited/OutCampus/commit/77f294ede968bd51cd1aa7d7e52f50d9720cc8e2))

### [0.1.11](https://github.com/Kayr-Technologies-Private-Limited/OutCampus/compare/v0.1.10...v0.1.11) (2020-06-07)


### Features

* add latest schema migrations ([daf41a1](https://github.com/Kayr-Technologies-Private-Limited/OutCampus/commit/daf41a15afd3ea35522f27cec51a051cf8ffb624))

### [0.1.10](https://github.com/Kayr-Technologies-Private-Limited/OutCampus/compare/v0.1.9...v0.1.10) (2020-06-07)


### Features

* add change password in profile ([543de9b](https://github.com/Kayr-Technologies-Private-Limited/OutCampus/commit/543de9bd10bbe7856a2ba0a88c22efed16381c99))
* add homepage ([92bd603](https://github.com/Kayr-Technologies-Private-Limited/OutCampus/commit/92bd6031ddf0d70a23b072313606d4e231548ae5))
* add latest db schema ([4e652e3](https://github.com/Kayr-Technologies-Private-Limited/OutCampus/commit/4e652e3f536ffc2d68774831fb76a88593c36d89))
* add prisma migrations ([904653e](https://github.com/Kayr-Technologies-Private-Limited/OutCampus/commit/904653ed92099abc43fdc43cb6b2c2dae6a5e6c9))
* mov enrolment to separate endpoint ([85901d7](https://github.com/Kayr-Technologies-Private-Limited/OutCampus/commit/85901d7ba31de77fa111165e98c558335483023e))


### Bug Fixes

* add feedback to course addition form in admin ([35a850a](https://github.com/Kayr-Technologies-Private-Limited/OutCampus/commit/35a850a42aa91f32b57b2e31a55939a411e4e269))
* add outcampus_id to users registered through google as well ([7821b22](https://github.com/Kayr-Technologies-Private-Limited/OutCampus/commit/7821b2279fe4d06062424185ac15fbdc36c488e9))
* change profile to a 1-1 relation to user ([d863ba1](https://github.com/Kayr-Technologies-Private-Limited/OutCampus/commit/d863ba17abc1577a4318a290e4c646c4180a5751))
* fix google login and signup and allow autologin after signup ([a02216d](https://github.com/Kayr-Technologies-Private-Limited/OutCampus/commit/a02216dae03ee28d614abc2e7ba82b25e24764c5))
* store social auth data to separate tabels ([662d963](https://github.com/Kayr-Technologies-Private-Limited/OutCampus/commit/662d9633ec6c663bd22847b08494a57d493dd0ea))
* use class summary instead of class description ([9ca3207](https://github.com/Kayr-Technologies-Private-Limited/OutCampus/commit/9ca32075b20638d82e00b0be00fe597187b108ca))

### [0.1.9](https://github.com/Kayr-Technologies-Private-Limited/OutCampus/compare/v0.1.8...v0.1.9) (2020-06-05)


### Features

* add basic cashfree payouts code ([a39a9e2](https://github.com/Kayr-Technologies-Private-Limited/OutCampus/commit/a39a9e23b5b8457694baf8f093e35940be567703))
* add intropect and add new prisma schema because of database changes ([7fd76c0](https://github.com/Kayr-Technologies-Private-Limited/OutCampus/commit/7fd76c03b35a63bbe538121a6fd9ee8ebeea482a))
* add new search API ([8502f05](https://github.com/Kayr-Technologies-Private-Limited/OutCampus/commit/8502f050fe56d1d578cd3c9c53121326b2159e52))
* fix profile form issues ([7dacbff](https://github.com/Kayr-Technologies-Private-Limited/OutCampus/commit/7dacbffffae10b3d4355856e3b8507ed6b82229c))
* get class and enrolment information in courses listing ([9095c25](https://github.com/Kayr-Technologies-Private-Limited/OutCampus/commit/9095c2543895c8e199d120d69d4b2af555bf003b))
* upload cover image of course correctly ([8d115e2](https://github.com/Kayr-Technologies-Private-Limited/OutCampus/commit/8d115e291c4c57f2ca186c8438f7508255c221b0))


### Bug Fixes

* initial test of payout ([3e2ff81](https://github.com/Kayr-Technologies-Private-Limited/OutCampus/commit/3e2ff81fe12a4571ef364315eca455331854fd91))
* return correct errors on signup ([c05fe87](https://github.com/Kayr-Technologies-Private-Limited/OutCampus/commit/c05fe87df9ccd929cc88c0c2ae61ee6fc8691225))
* show correct cover image for the course in 16:10 aspect ratio ([f0cc581](https://github.com/Kayr-Technologies-Private-Limited/OutCampus/commit/f0cc5818143acbc256f1505c45264fc40ce42221))

### [0.1.8](https://github.com/Kayr-Technologies-Private-Limited/OutCampus/compare/v0.1.7...v0.1.8) (2020-06-03)


### Features

* add course objective to the course form ([eb22576](https://github.com/Kayr-Technologies-Private-Limited/OutCampus/commit/eb2257688d3c086b01de231d4d33c74b48e008c2))
* add inbox and fix layout issues in other pages ([04ce83c](https://github.com/Kayr-Technologies-Private-Limited/OutCampus/commit/04ce83cd1e4b14a433c5cd4465184cdfb2ab0a94))
* add level to the course creation form ([1c71794](https://github.com/Kayr-Technologies-Private-Limited/OutCampus/commit/1c71794f7b7cb5f6cea7cedeadd25828c3ff9941))
* add multiple session support ([28c5b50](https://github.com/Kayr-Technologies-Private-Limited/OutCampus/commit/28c5b50bdc9b193cdfcf8ee6e2f650fc44ff3c90))
* add support for single session classes in course creation form ([d4d166c](https://github.com/Kayr-Technologies-Private-Limited/OutCampus/commit/d4d166c5db1facde9aeed40880720626d3fdeac2))
* create unique student and teachers IDs during signup ([3938df4](https://github.com/Kayr-Technologies-Private-Limited/OutCampus/commit/3938df457dfde668931805536fc79570eecc6679))
* make summary and objective mandatory fileds ([56bd64d](https://github.com/Kayr-Technologies-Private-Limited/OutCampus/commit/56bd64d8c6b9ab5e2ea4ef2784e78968c89b2445))
* modify API to support multiple class addition to a course ([04d7891](https://github.com/Kayr-Technologies-Private-Limited/OutCampus/commit/04d7891507df019d1b7c1d554b6d965eed17ffa0))


### Bug Fixes

* fix course creation api ([2677dfd](https://github.com/Kayr-Technologies-Private-Limited/OutCampus/commit/2677dfd3735079ac32845035a20616fc4766c13c))

### [0.1.7](https://github.com/Kayr-Technologies-Private-Limited/OutCampus/compare/v0.1.6...v0.1.7) (2020-05-31)


### Features

* add academy field while creating a course ([027592a](https://github.com/Kayr-Technologies-Private-Limited/OutCampus/commit/027592a437e152e4acc2127c1e871626d44f6e66))
* add dropzone as dependency ([861f979](https://github.com/Kayr-Technologies-Private-Limited/OutCampus/commit/861f9798ba6202508cdb1b6fba405712a49beb9f))
* show a toast message on success and failure of course creation form ([c6b6809](https://github.com/Kayr-Technologies-Private-Limited/OutCampus/commit/c6b680981f27d40c4863230bb91da6d1ee6360ed))
* validate course creation form ([74418cd](https://github.com/Kayr-Technologies-Private-Limited/OutCampus/commit/74418cd85775fb3a1ce588ede69b5161621c1d2a))


### Bug Fixes

* fix issues in dashboard layout and form ([d095ca1](https://github.com/Kayr-Technologies-Private-Limited/OutCampus/commit/d095ca19e2dd7c7322c74db976ab4de4c8a64ece))
* show course teacher details correctly ([e91c377](https://github.com/Kayr-Technologies-Private-Limited/OutCampus/commit/e91c3773d8a6635036f40f26234fe487649534d5))
* show courses created by the current users only in the dashboard ([a1abbf4](https://github.com/Kayr-Technologies-Private-Limited/OutCampus/commit/a1abbf4128e9f42046ff2ffabe41cc45a2ac9331))

### [0.1.6](https://github.com/Kayr-Technologies-Private-Limited/OutCampus/compare/v0.1.5...v0.1.6) (2020-05-29)


### Features

* store password_hash in user table so that we can implement our own logins ([699d14c](https://github.com/Kayr-Technologies-Private-Limited/OutCampus/commit/699d14c0d9d4e1516275edd6b5ddef1475f033d3))


### Bug Fixes

* fix auth and change DB to AWS ([2ddae19](https://github.com/Kayr-Technologies-Private-Limited/OutCampus/commit/2ddae1908ff274b31ec08e32f6f9fb6212765e54))
* fix login and signup using graphQL instead of REST API ([7f802d3](https://github.com/Kayr-Technologies-Private-Limited/OutCampus/commit/7f802d3f95a54ef4644605134557ed15177ab937))
* revert to older authentication ([ec3a7b1](https://github.com/Kayr-Technologies-Private-Limited/OutCampus/commit/ec3a7b1baffa825c237edee18b9b51b70f5a7de4))

### [0.1.5](https://github.com/Kayr-Technologies-Private-Limited/plush-frontend/compare/v0.1.4...v0.1.5) (2020-05-28)

### [0.1.4](https://github.com/Kayr-Technologies-Private-Limited/plush-frontend/compare/v0.1.3...v0.1.4) (2020-05-28)


### Bug Fixes

* fix admin login ([2d1fab7](https://github.com/Kayr-Technologies-Private-Limited/plush-frontend/commit/2d1fab718a03a2ff78acc65feceac6374ebdccb3))
* fix authentication with faceboook ([1fa2ff9](https://github.com/Kayr-Technologies-Private-Limited/plush-frontend/commit/1fa2ff908d3a9c7b3d1f52dc41b437bd8c9c591e))
* fix dashboard permissions ([8ee804e](https://github.com/Kayr-Technologies-Private-Limited/plush-frontend/commit/8ee804e5abda5908641601e6894d4c5d108a787d))

### [0.1.3](https://github.com/Kayr-Technologies-Private-Limited/plush-frontend/compare/v0.1.2...v0.1.3) (2020-05-27)


### Features

* add firebase phone OTP login ([aff8d0d](https://github.com/Kayr-Technologies-Private-Limited/plush-frontend/commit/aff8d0dc102d5bb930f07546f1164d7062f8d66c))

### [0.1.2](https://github.com/Kayr-Technologies-Private-Limited/plush-frontend/compare/v0.1.1...v0.1.2) (2020-05-27)


### Bug Fixes

* fetch nested course status for the teacher as well ([5dc4fff](https://github.com/Kayr-Technologies-Private-Limited/plush-frontend/commit/5dc4fff3eb06651e6112a4956d62331e5d9ec19e))

### [0.1.1](https://github.com/Kayr-Technologies-Private-Limited/plush-frontend/compare/v0.1.0...v0.1.1) (2020-05-27)


### Features

* add admin, mange subjects and courses ([69b35bd](https://github.com/Kayr-Technologies-Private-Limited/plush-frontend/commit/69b35bd04dd21a227820f9d2b0d2b6371221bad8))


### Bug Fixes

* show only approved courses on the website ([cd43043](https://github.com/Kayr-Technologies-Private-Limited/plush-frontend/commit/cd43043131b266cbca05f4f4d310f2251fec186d))

## [0.1.0](https://github.com/Kayr-Technologies-Private-Limited/plush-frontend/compare/v0.0.2...v0.1.0) (2020-05-27)


### ⚠ BREAKING CHANGES

* Created dB schema with tables and relations

### Features

* add admin CRUD ([4ec7a94](https://github.com/Kayr-Technologies-Private-Limited/plush-frontend/commit/4ec7a948f0cf1e16a43ff6ad62317cc872d2b09f))
* add admin login ([ad93544](https://github.com/Kayr-Technologies-Private-Limited/plush-frontend/commit/ad93544e89de6829457940ece90efa24c48a8af7))
* add CRUD REST APIs for course, student, teacher, and subject ([79620e0](https://github.com/Kayr-Technologies-Private-Limited/plush-frontend/commit/79620e04ffcd3ce462b72ad569986fb153ed37b6))
* add initial db migration ([d8c88e6](https://github.com/Kayr-Technologies-Private-Limited/plush-frontend/commit/d8c88e623d8fd497933de3af027c0f0a381ca23b))
* add option to delete admins ([deb9333](https://github.com/Kayr-Technologies-Private-Limited/plush-frontend/commit/deb9333704683014870582dc8304c00399af9e00))
* add prisma client and generate schema ([40480fc](https://github.com/Kayr-Technologies-Private-Limited/plush-frontend/commit/40480fca521dbe19f272691c489075c78449a477))
* add useAuth util for all authentication and user session needs ([5e7bdcc](https://github.com/Kayr-Technologies-Private-Limited/plush-frontend/commit/5e7bdccdd584cde5a0eaea122a461b923412892a))
* change listing to cards instead of tables ([632c131](https://github.com/Kayr-Technologies-Private-Limited/plush-frontend/commit/632c1316e1df401b7bb7a1b257d8c48631d5f972))
* create course creation form with fake data ([2e20112](https://github.com/Kayr-Technologies-Private-Limited/plush-frontend/commit/2e201129fdd3010770457bb00dcdc6928e5d1fd8))
* create new component for inbox ([0eb5045](https://github.com/Kayr-Technologies-Private-Limited/plush-frontend/commit/0eb5045464b1e29940d20e8f0155426ec4949aa7))
* enrol student to a course ([f87c8a7](https://github.com/Kayr-Technologies-Private-Limited/plush-frontend/commit/f87c8a76d10483b01c88e20b0b026dabe97dd48d))
* show course listing page ([cd983fd](https://github.com/Kayr-Technologies-Private-Limited/plush-frontend/commit/cd983fdc596f264d8a53656575d38d3079a711b9))

### [0.0.2](https://github.com/Kayr-Technologies-Private-Limited/plush-frontend/compare/v0.0.1...v0.0.2) (2020-05-23)


### Features

* add basic routing and separate components and pages ([d6718b1](https://github.com/Kayr-Technologies-Private-Limited/plush-frontend/commit/d6718b14a989589d3ab4f8610669849dcebe6bb9))
* add tailwindCSS to the project ([6769ace](https://github.com/Kayr-Technologies-Private-Limited/plush-frontend/commit/6769acef31210ddb8941a9c6d11cd86835e7f46f))
* initialize Google Analytics and log pageviews ([a4741a4](https://github.com/Kayr-Technologies-Private-Limited/plush-frontend/commit/a4741a47e375724c2e3843c05d5d6bc605aecdd8))
* show login/signup and redirect to dashboard when the user logs in ([3bd21a6](https://github.com/Kayr-Technologies-Private-Limited/plush-frontend/commit/3bd21a6b2e86b124bc1e99f3a2d276f80d61b80d))
* use Formik and Yup for proper form management and validation ([e8a1a52](https://github.com/Kayr-Technologies-Private-Limited/plush-frontend/commit/e8a1a524128a00a459a68f53e3298b80440efeed))


### Bug Fixes

* replace class to className ([6751dea](https://github.com/Kayr-Technologies-Private-Limited/plush-frontend/commit/6751dea2eef8ba6920f7ed6a26b9a6f9cacf3716))

### 0.0.1 (2020-05-18)
