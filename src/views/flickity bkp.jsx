<Flickity
                    className={"carousel"} // default ''
                    elementType={"div"} // default 'div'
                    options={ {initialIndex: 0} } // takes flickity options {}
                    disableImagesLoaded={false} // default false
                    reloadOnUpdate // default false
                    static // default false
                    infinite
                >
                    {/* <div className="slide">
                        <img src={kluBgBlurred} alt="" />
                        <div className="title">Slide</div>
                    </div>

                    <div className="slide">
                        <img src={kluBgBlurred} alt="" />
                        <div className="title">Slide</div>
                    </div>

                    <div className="slide">
                        <img src={kluBgBlurred} alt="" />
                        <div className="title">Slide</div>
                    </div> */}
                    <ImageComp
                            src={vineethImg}
                            alt="GFG Team at KLU"
                            text={
                                <>
                                    Image taken after event GFG Summer Carnival!{" "}
                                    <Link to="/events/gfg_summer_carnival">
                                        Go to event
                                    </Link>{" "}
                                </>
                            }
                        />
                         <ImageComp
                            src={jagdeeshImg}
                            alt="GFG Team at KLU"
                            text={
                                <>
                                    Image taken after event GFG Summer Carnival!{" "}
                                    <Link to="/events/gfg_summer_carnival">
                                        Go to event
                                    </Link>{" "}
                                </>
                            }
                        />
                         <ImageComp
                            src={vivekImg}
                            alt="GFG Team at KLU"
                            text={
                                <>
                                    Image taken after event GFG Summer Carnival!{" "}
                                    <Link to="/events/gfg_summer_carnival">
                                        Go to event
                                    </Link>{" "}
                                </>
                            }
                        />
                    {/* <img src={kluBgBlurred} />
                    <img src={kluBgBlurred} />
                    <img src={kluBgBlurred} /> */}
                </Flickity>