var pageslideDirective = angular.module("pageslide-directive", []);

pageslideDirective.directive('pageslide', [
    function (){
        var defaults = {};

        /* Return directive definition object */

        return {
            restrict: "EA",
            replace: false,
            transclude: false,
            scope: true,
            link: function ($scope, el, attrs) {
                /* Inspect */
                //console.log($scope);
                //console.log(el);
                //console.log(attrs);

                /* parameters */
                var param = {};
                param.side = attrs.pageslide || 'right';
                param.speed = attrs.psSpeed || '0.5';
                param.size = attrs.psSize || '300px';

                /* DOM manipulation */
                //console.log(el);
                var content = null;
                if (el.children() && el.children().length) {
                    content = el.children()[0];  
                } else {
                    content = document.getElementById(attrs.psTarget.substr(1));
                }
                //console.log(content);
                // Check for content
                if (!content) 
                    throw new Error('You have to elements inside the <pageslide> or you have not specified a target href');
                var slider = document.createElement('div');
                slider.className = "ng-pageslide";

                /* Style setup */
                slider.style.transitionDuration = param.speed + 's';
                slider.style.webkitTransitionDuration = param.speed + 's';
                slider.style.zIndex = 3000;
                slider.style.position = 'fixed';
                slider.style.width = 0;
                slider.style.height = 0;
                slider.style.transitionProperty = 'width, height';
                slider.style.boxShadow = '0px 0px 8px #444444';
                
                content.style.whiteSpace = 'nowrap';
                content.style.display = 'block';

                switch (param.side){
                    case 'right':
                        slider.style.height = attrs.psCustomHeight || '100%'; 
                        slider.style.top = attrs.psCustomTop ||  '0px';
                        slider.style.bottom = attrs.psCustomBottom ||  '0px';
                        slider.style.right = attrs.psCustomRight ||  '0px';
                        break;
                    case 'left':
                        slider.style.height = attrs.psCustomHeight || '100%';   
                        slider.style.top = attrs.psCustomTop || '0px';
                        slider.style.bottom = attrs.psCustomBottom || '0px';
                        slider.style.left = attrs.psCustomLeft || '0px';
                        break;
                    case 'top':
                        slider.style.width = attrs.psCustomWidth || '100%';   
                        slider.style.left = attrs.psCustomLeft || '0px';
                        slider.style.top = attrs.psCustomTop || '0px';
                        slider.style.right = attrs.psCustomRight || '0px';
                        break;
                    case 'bottom':
                        slider.style.width = attrs.psCustomWidth || '100%'; 
                        slider.style.bottom = attrs.psCustomBottom || '0px';
                        slider.style.left = attrs.psCustomLeft || '0px';
                        slider.style.right = attrs.psCustomRight || '0px';
                        break;
                }


                /* Append */
                document.body.appendChild(slider);
                slider.appendChild(content);

                /* Closed */
                function psClose(slider,param){
                    if (slider.style.width !== 0 && slider.style.width !== 0){
                        //content.style.display = 'none';
                        switch (param.side){
                            case 'right':
                                slider.style.width = '0px'; 
                                break;
                            case 'left':
                                slider.style.width = '0px';
                                break;
                            case 'top':
                                slider.style.height = '0px'; 
                                break;
                            case 'bottom':
                                slider.style.height = '0px'; 
                                break;
                        }
                    }
                }

                /* Open */
                function psOpen(slider,param){
                    if (slider.style.width !== 0 && slider.style.width !== 0){
                        switch (param.side){
                            case 'right':
                                slider.style.width = param.size; 
                                break;
                            case 'left':
                                slider.style.width = param.size; 
                                break;
                            case 'top':
                                slider.style.height = param.size; 
                                break;
                            case 'bottom':
                                slider.style.height = param.size; 
                                break;
                        }
//                        setTimeout(function(){
//                            //content.style.display = 'block';
//                        },(param.speed * 1000));

                    }
                }
                
                function isOpen() {
                    var _isOpen = false;
                    
                    switch (param.side){
                        case 'right':
                        case 'left':
                            _isOpen = !slider.style.width.match(/^0/); 
                            break;
                        case 'top':
                        case 'bottom':
                            _isOpen = !slider.style.height.match(/^0/); 
                            break;
                    }
                    
                    return _isOpen;
                }

                /*
                * Watchers
                * */
                $scope.$watch(function(){
                    return el.attr('ps-size');
                }, function (value) {
                    if (!value.match(/^0/)) {
                        param.size = value;

                        if (isOpen()) {
                            psOpen(slider, param);
                        }
                    }
                });
                
                $scope.$watch(function() {
                    return el.attr('ps-open');
                }, function (value){
                    
                    if (value === 'true' || value === true) {
                        // Open
                        psOpen(slider,param);
                    } else {
                        // Close
                        psClose(slider,param);
                    }
                }, true);

                // close panel on location change
                if(attrs.pSAutoClose){
                    $scope.$on("$locationchangestart", function(){
                        psClose(slider, param);
                    });
                }

               

//                /*
//                * Events
//                * */
//                var close_handler = (attrs.href) ? document.getElementById(attrs.href.substr(1) + '-close') : null;
//                if (el[0].addEventListener) {
//                    el[0].addEventListener('click',function(e){
//                        e.preventDefault();
//                        psOpen(slider,param);                    
//                    });
//
//                    if (close_handler){
//                        close_handler.addEventListener('click', function(e){
//                            e.preventDefault();
//                            psClose(slider,param);
//                        });
//                    }
//                } else {
//                    // IE8 Fallback code
//                    el[0].attachEvent('onclick',function(e){
//                        e.returnValue = false;
//                        psOpen(slider,param);                    
//                    });
//
//                    if (close_handler){
//                        close_handler.attachEvent('onclick', function(e){
//                            e.returnValue = false;
//                            psClose(slider,param);
//                        });
//                    }
//                }

            }
        };
    }
]);

