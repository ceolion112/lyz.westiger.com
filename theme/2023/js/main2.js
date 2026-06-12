$((function () {
        let $win = $(window), winLoaded = !1, winW = $win.width(), winH = $win.height(), scrollTop = $win.scrollTop(),
            scrollTopPrev = scrollTop, scrollTopDiff = 0, winEnd = scrollTop + winH, breakPoint = 979,
            isSP = winW <= 979, timer = 0, $header_menu = $(".header_menu"),
            $header_menu_inner = $header_menu.find(".header_menu_rightInner"),
            $header_menu_links = $header_menu.find(".header_menu_links"), is_dragging = !1, dragY, barPos,
            webFontNum = 2, webFontLoaded = 0, mvLoaded = !1;



        var $service_list = $(".secService .listLinks")
            , $service_ph = $(".secService_ph");
        $service_list.hover((function () {
                if (isSP)
                    return !0
            }
        ), (function () {
                if (isSP)
                    return $(this).removeClass("is-hover"),
                        !0
            }
        )),
            $("a", $service_list).hover((function () {
                    if (isSP)
                        return !0;
                    let $target, $li = $(this).parents("li"), index = $service_list.find("li").index($li);
                    $service_list.addClass("is-hover"),
                        $service_ph.each((function () {
                                let $this = $(this);
                                if ($this.find("li").eq(index).hasClass("is-show"))
                                    return !0;
                                $this.find("li").removeClass("is-out"),
                                    setTimeout((function () {
                                            $("li.is-show", $this).addClass("is-out").removeClass("is-show"),
                                                $("li", $this).eq(index).addClass("is-show")
                                        }
                                    ), 1)
                            }
                        ))
                }
            ), (function () {
                    if (isSP)
                        return !0;
                    $service_list.removeClass("is-hover")
                }
            ))
    }
))

$(window).scroll(function () {
    let t1 = $(window).height();
    let t2 = $(window).scrollTop();
    $(".anim:not(.is-show)").each((function () {
            var targetPosition = $(this).offset().top;
            targetPosition < t2 + .7 * t1 && $(this).addClass("is-show")
        }
    ))
})