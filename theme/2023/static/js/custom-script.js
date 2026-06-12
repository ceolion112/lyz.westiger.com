function cateCarousel() {
    if ($().owlCarousel) {
        $('.grid-category').each(function () {
            var
                $this = $(this),
                auto = $this.data("auto"),
                loop = $this.data("loop"),
                item = $this.data("column"),
                nav = $this.data("nav"),
                item2 = $this.data("column2"),
                item3 = $this.data("column3"),
                gap = Number($this.data("gap"));

            $this.find('.owl-carousel').owlCarousel({
                loop: loop,
                margin: gap,
                nav: nav,
                navigation: nav,
                pagination: true,
                autoplay: auto,
                autoplayTimeout: 5000,
                responsive: {
                    0: {
                        items: item3
                    },
                    600: {
                        items: item2
                    },
                    1000: {
                        items: item
                    }
                }
            });
        });
    }
}
cateCarousel();
(function (a) {
    function d() {
        if (a(".preloader").length) {
            a("body").addClass("page-loaded");
            a(".preloader").delay(300).fadeOut(0)
        }
    }
    function e() {
        if (a(".main-header").length) {
            var o = a(window).scrollTop();
            var m = a(".main-header");
            var n = a(".main-header .sticky-header");
            if (o > 120) {
                m.addClass("fixed-header");
                n.addClass("animated slideInDown")
            } else {
                m.removeClass("fixed-header");
                n.removeClass("animated slideInDown")
            }
        }
    }

    e();
    if (a(".main-header li.dropdown ul").length) {
        a(".main-header .navigation li.dropdown > a").append('<div class="dropdown-btn"><span class="fa fa-angle-right"></span></div>')
    }
    if (a(".side-menu__block").length) {
        // 添加标志位，确保只执行一次
        if (window.mobileMenuInitialized) {
            return;
        }
        window.mobileMenuInitialized = true;
        
        var f = a(".main-header .nav-outer .main-menu").html();
        var g = a(".mobile-nav__container");
        
        // 清理HTML中的换行符和多余空格
        f = f.replace(/<br\s*\/?\s*>/gi, '').replace(/\r?\n|\r/g, '').replace(/>\s+</g, '><');
        
        // 清空容器后再添加（防止重复）
        g.empty().append(f);
        
        // 为一级菜单添加正确的结构（文本 + 下拉按钮）
        g.find("li.dropdown > a").each(function() {
            var $link = a(this);
            var originalText = $link.text().trim();
            
            // 如果已经处理过，跳过
            if ($link.find(".menu-text").length > 0) {
                return;
            }
            
            // 构建正确的HTML结构：文本 + 下拉按钮（不包含图标）
            var newContent = '';
            newContent += '<span class="menu-text">' + originalText + '</span>';
            newContent += '<div class="dropdown-btn"><span class="fa fa-angle-right"></span></div>';
            
            $link.html(newContent);
        });
        
        // 处理移动端菜单项（子菜单）
        // 为每个 dropdown 创建 ul 容器，并从 .service-block 提取数据
        g.find("li.dropdown").each(function() {
            var $dropdown = a(this);
            var $subMenu = $dropdown.find(".x-sub-menu");
            
            // 如果已经有 ul，跳过
            if ($dropdown.find("> ul").length > 0) {
                return;
            }
            
            // 如果存在 x-sub-menu，提取其中的 service-block 数据
            if ($subMenu.length > 0) {
                // 创建 ul 元素
                var $ul = a('<ul></ul>');
                
                // 从 service-block 中提取链接和名称
                $subMenu.find(".service-block").each(function() {
                    var link = a(this).find("h6 a").attr("href");
                    var name = a(this).find("h6 a").text();
                    
                    // 创建菜单项
                    var $li = a('<li><a href="' + link + '"><span class="menu-text">' + name + '</span></a></li>');
                    $ul.append($li);
                });
                
                // 将 ul 添加到 dropdown 中
                $dropdown.append($ul);
            }
        });
        
        // 移除桌面端的 x-sub-menu 结构
        g.find(".x-sub-menu").remove();
        
        console.log('=== 移动端菜单调试信息 ===');
        console.log('移动菜单容器存在:', g.length > 0);
        console.log('下拉菜单项数量:', g.find("li.dropdown").length);
        
        // 先解绑所有相关事件，确保没有冲突
        g.find("li.dropdown .dropdown-btn, li.dropdown > a").off();
        
        // 下拉按钮点击事件
        g.find("li.dropdown .dropdown-btn").on("click", function (m) {
            console.log('下拉按钮被点击了!');
            m.preventDefault();
            m.stopPropagation();
            
            var $btn = a(this);
            var $li = $btn.closest("li.dropdown");
            var $ul = $li.children("ul");
            
            // 关闭所有菜单
            g.find("li.dropdown").removeClass("open").find(".dropdown-btn").removeClass("open");
            g.find("li.dropdown > ul").slideUp(300);
            
            // 如果当前菜单有子菜单，打开它
            if ($ul.length > 0) {
                $btn.addClass("open");
                $li.addClass("open");
                $ul.slideDown(300);
            }
        });
        
        // 阻止点击菜单链接时触发其他事件
        g.find("li.dropdown > a").on("click", function (m) {
            m.stopPropagation();
        });
        a(".mobile-nav-toggler").on("click", function () {
            a(".side-menu__block").addClass("active")
        });
        a(".side-menu__block-overlay,.side-menu__toggler").on("click", function (m) {
            a(".side-menu__block").removeClass("active");
            m.preventDefault()
        })
    }
    if (a(".search-popup").length) {
        a(".search-toggler").on("click", function () {
            a(".search-popup").addClass("active")
        });
        a(".search-popup__overlay").on("click", function (m) {
            a(".search-popup").removeClass("active");
            m.preventDefault()
        });
        a(document).keydown(function (m) {
            if (m.keyCode === 27) {
                a(".search-popup").addClass("active")
            }
        })
    }
    if (a(".custom-cursor__overlay").length) {
        var b = a(".custom-cursor__overlay .cursor"), c = a(".custom-cursor__overlay .cursor-follower");
        var j = 0, k = 0;
        var h = 0, i = 0;
        TweenMax.to({}, 0.016, {
            repeat: -1, onRepeat: function () {
                j += (h - j) / 9;
                k += (i - k) / 9;
                TweenMax.set(c, {css: {left: j - 22, top: k - 22}});
                TweenMax.set(b, {css: {left: h, top: i}})
            }
        });
        a(document).on("mousemove", function (m) {
            var n = window.pageYOffset || document.documentElement.scrollTop;
            h = m.pageX;
            i = m.pageY - n
        });
        a("button, a").on("mouseenter", function () {
            b.addClass("active");
            c.addClass("active")
        });
        a("button, a").on("mouseleave", function () {
            b.removeClass("active");
            c.removeClass("active")
        });
        a(".custom-cursor__overlay").on("mouseenter", function () {
            b.addClass("close-cursor");
            c.addClass("close-cursor")
        });
        a(".custom-cursor__overlay").on("mouseleave", function () {
            b.removeClass("close-cursor");
            c.removeClass("close-cursor")
        })
    }
    if (a(".banner-carousel").length) {
        a(".banner-carousel").owlCarousel({
            loop: true,
            animateOut: "fadeOut",
            animateIn: "fadeIn",
            margin: 0,
            nav:false,
            dots:true,
            smartSpeed: 500,
            autoplay: 6000,
            autoplayTimeout: 6000,
            responsive: {0: {items: 1}, 600: {items: 1}, 800: {items: 1}, 992: {items: 1}}
        })
    }
    if (a(".team-carousel").length) {
        a(".team-carousel").owlCarousel({
            loop: true,
            margin: 30,
            nav: true,
            smartSpeed: 700,
            autoplay: 5000,
            autoplayTimeout: 5000,
            navText: ['<span class="icon fa fa-angle-left"></span>', '<span class="icon fa fa-angle-right"></span>'],
            responsive: {
                0: {items: 1},
                600: {items: 2},
                992: {items: 3},
                1200: {items: 4},
                1500: {items: 4},
                1600: {items: 5}
            }
        })
    }
    if (a(".sponsors-carousel").length) {
        a(".sponsors-carousel").owlCarousel({
            loop: true,
            margin: 30,
            nav: true,
            smartSpeed: 700,
            autoplay: 5000,
            autoplayTimeout: 5000,
            navText: ['<span class="icon fa fa-angle-left"></span>', '<span class="icon fa fa-angle-right"></span>'],
            responsive: {0: {items: 1}, 600: {items: 2}, 768: {items: 3}, 992: {items: 4}, 1200: {items: 5}}
        })
    }
    if (a(".project-carousel").length) {
        a(".project-carousel").owlCarousel({
            loop: true,
            margin: 30,
            nav: true,
            smartSpeed: 700,
            autoplay: 5000,
            navText: ['<span class="fa fa-angle-left"></span>', '<span class="fa fa-angle-right"></span>'],
            responsive: {
                0: {items: 1},
                768: {items: 2},
                992: {items: 3},
                1200: {items: 3},
                1500: {items: 4},
                1600: {items: 4}
            }
        })
    }
    if (a(".project-carousel-two").length) {
        a(".project-carousel-two").owlCarousel({
            loop: true,
            margin: 30,
            nav: true,
            smartSpeed: 700,
            autoplay: 5000,
            navText: ['<span class="fa fa-angle-left"></span>', '<span class="fa fa-angle-right"></span>'],
            responsive: {0: {items: 1}, 600: {items: 1}, 768: {items: 2}, 992: {items: 3}, 1200: {items: 3}}
        })
    }
    if (a(".testimonials-carousel").length) {
        a(".testimonials-carousel").owlCarousel({
            loop: true,
            margin: 30,
            nav: true,
            smartSpeed: 700,
            autoplay: 5000,
            autoplayTimeout: 5000,
            navText: ['<span class="icon fa fa-angle-left"></span>', '<span class="icon fa fa-angle-right"></span>'],
            responsive: {0: {items: 1}, 600: {items: 1}, 768: {items: 1}, 992: {items: 2}, 1200: {items: 2}}
        })
    }
    if (a(".testimonials-carousel-two").length) {
        a(".testimonials-carousel-two").owlCarousel({
            loop: true,
            margin: 30,
            nav: true,
            smartSpeed: 700,
            autoplay: 5000,
            autoplayTimeout: 5000,
            navText: ['<span class="icon fa fa-angle-left"></span>', '<span class="icon fa fa-angle-right"></span>'],
            responsive: {0: {items: 1}, 600: {items: 1}, 768: {items: 1}, 1200: {items: 1}}
        })
    }
    if (a(".single-item-carousel").length) {
        a(".single-item-carousel").owlCarousel({
            loop: true,
            margin: 30,
            nav: true,
            smartSpeed: 500,
            autoplay: 5000,
            autoplayTimeout: 5000,
            navText: ['<span class="icon fa fa-angle-left"></span>', '<span class="icon fa fa-angle-right"></span>'],
            responsive: {0: {items: 1}, 600: {items: 1}, 800: {items: 1}, 1024: {items: 1}}
        })
    }
    if (a(".count-bar").length) {
        a(".count-bar").appear(function () {
            var m = a(this);
            var n = m.data("percent");
            a(m).css("width", n).addClass("counted")
        }, {accY: -50})
    }
    if (a(".count-box").length) {
        a(".count-box").appear(function () {
            var m = a(this), o = m.find(".count-text").attr("data-stop"),
                p = parseInt(m.find(".count-text").attr("data-speed"), 10);
            if (!m.hasClass("counted")) {
                m.addClass("counted");
                a({countNum: m.find(".count-text").text()}).animate({countNum: o}, {
                    duration: p,
                    easing: "linear",
                    step: function () {
                        m.find(".count-text").text(Math.floor(this.countNum))
                    },
                    complete: function () {
                        m.find(".count-text").text(this.countNum)
                    }
                })
            }
        }, {accY: 0})
    }
    if (a(".dial").length) {
        a(".dial").appear(function () {
            var n = a(this);
            var m = n.attr("data-fgColor");
            var o = n.attr("value");
            var p = n.attr("data-thickness");
            n.knob({
                value: 0,
                min: 0,
                max: 100,
                skin: "tron",
                readOnly: true,
                thickness: p,
                dynamicDraw: true,
                displayInput: false
            });
            a({value: 0}).animate({value: o}, {
                duration: 2000, easing: "swing", progress: function () {
                    n.val(Math.ceil(this.value)).trigger("change")
                }
            })
        }, {accY: 0})
    }
    if (a(".tabs-box").length) {
        a(".tabs-box .tab-buttons .tab-btn").on("click", function (m) {
            m.preventDefault();
            var n = a(a(this).attr("data-tab"));
            if (a(n).is(":visible")) {
                return false
            } else {
                n.parents(".tabs-box").find(".tab-buttons").find(".tab-btn").removeClass("active-btn");
                a(this).addClass("active-btn");
                n.parents(".tabs-box").find(".tabs-content").find(".tab").fadeOut(0);
                n.parents(".tabs-box").find(".tabs-content").find(".tab").removeClass("active-tab");
                a(n).fadeIn(300);
                a(n).addClass("active-tab")
            }
        })
    }
    if (a(".project-tab").length) {
        a(".project-tab .product-tab-btns .p-tab-btn").on("click", function (m) {
            m.preventDefault();
            var n = a(a(this).attr("data-tab"));
            if (a(n).hasClass("actve-tab")) {
                return false
            } else {
                a(".project-tab .product-tab-btns .p-tab-btn").removeClass("active-btn");
                a(this).addClass("active-btn");
                a(".project-tab .p-tabs-content .p-tab").removeClass("active-tab");
                a(n).addClass("active-tab")
            }
        })
    }
    if (a(".accordion-box").length) {
        a(".accordion-box").on("click", ".acc-btn", function () {
            var m = a(this).parents(".accordion-box");
            var n = a(this).parents(".accordion");
            if (a(this).next(".acc-content").is(":visible")) {
                a(this).removeClass("active");
                a(this).next(".acc-content").slideUp(300);
                a(m).children(".accordion").removeClass("active-block")
            } else {
                a(m).find(".accordion .acc-btn").removeClass("active");
                a(this).addClass("active");
                a(m).children(".accordion").removeClass("active-block");
                a(m).find(".accordion").children(".acc-content").slideUp(300);
                n.addClass("active-block");
                a(this).next(".acc-content").slideDown(300)
            }
        })
    }
    if (a(".custom-select-box").length) {
        a(".custom-select-box").selectmenu().selectmenu("menuWidget").addClass("overflow")
    }
    if (a(".date-picker").length) {
        a(".date-picker").datepicker()
    }
    if (a(".lightbox-image").length) {
        a(".lightbox-image").fancybox({openEffect: "fade", closeEffect: "fade", helpers: {media: {}}})
    }
    if (a(".filter-list").length) {
        a(".filter-list").mixItUp({})
    }
    if (a("#contact-form").length) {
        a("#contact-form").validate({
            rules: {
                username: {required: true},
                email: {required: true, email: true},
                phone: {required: true},
                subject: {required: true},
                message: {required: true}
            }
        })
    }
    if (a(".scroll-to-target").length) {
        a(".scroll-to-target").on("click", function () {
            var m = a(this).attr("data-target");
            a("html, body").animate({scrollTop: a(m).offset().top}, 1000);
            return false
        })
    }
    if (a(".wow").length) {
        var l = new WOW({boxClass: "wow", animateClass: "animated", offset: 0, mobile: false, live: true});
        l.init()
    }
    a(window).on("scroll", function () {
        e();
        if (a(".scroll-to-top").length) {
            var m = 100;
            if (a(window).scrollTop() > m) {
                a(".scroll-to-top").fadeIn(500)
            } else {
                if (a(this).scrollTop() <= m) {
                    a(".scroll-to-top").fadeOut(500)
                }
            }
        }
    });
    // a(window).on("resize", function () {
    // });
    // a(window).on("load", function () {
    //     d()
    // })
})(window.jQuery)
$(window).on('load', function () {
    $(".button.button-sliding-icon").each(function () {
        var buttonWidth = $(this).outerWidth() + 30;
        $(this).css('width', buttonWidth);
    });
});
