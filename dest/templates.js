angular.module("scrum-board-frontend").run(["$templateCache", function($templateCache) {$templateCache.put("app/board.tpl.html","<div class=\"board-container\">\n    <div class=\"board-navbar\">\n        <select class=\"form-control board-sprint-select\"\n                ng-change=\"sprintChanged()\"\n                ng-options=\"b.name for b in board.sprints track by b.id\"\n                ng-model=\"currentSprint\"></select>\n        <a class=\"btn btn-xs btn-info board-sprint-btn-add\" href=\"\" ng-click=\"openAddSprintModal()\"><i\n                class=\"glyphicon glyphicon-plus-sign\"></i>\n            Add</a>\n    </div>\n\n    <div class=\"task-list-container\">\n        <task-list ng-repeat=\"(zone, list) in models.dropzones\" slug=\"slug\" sprint=\"currentSprint\" zone=\"zone\"\n                   tasks=\"list\"></task-list>\n    </div>\n</div>");
$templateCache.put("app/home.tpl.html","<div class=\"container mtop20\">\n    <div class=\"row\">\n        <div class=\"col-md-3\" ng-repeat=\"b in boards\">\n            <a href=\"#/b/{{b.slug}}\">\n                <div class=\"panel panel-default\">\n                    <div class=\"panel-body\">\n                        {{b.name}}\n                    </div>\n                </div>\n            </a>\n        </div>\n        <div class=\"col-md-3\">\n            <div class=\"panel panel-default\">\n                <div class=\"panel-body\">\n                    <a href=\"\" ng-click=\"showAdd()\" ng-show=\"!showForm\">Add new board</a>\n                    <input type=\"text\" class=\"form-control\" ng-model=\"data.name\" placeholder=\"Title\"\n                           ng-keydown=\"keyDown($event)\" ng-show=\"showForm\" focus=\"{{showForm}}\" ng-blur=\"onBlur()\" />\n                </div>\n            </div>\n        </div>\n    </div>\n</div>");
$templateCache.put("app/landing-page.tpl.html","<div class=\"container\">\n    <h1>Login</h1>\n    <div>\n        With Facebook: <a href=\"/auth/facebook\">click here</a>\n    </div>\n    <div>\n        With Google: <a href=\"/auth/google\">click here</a>\n    </div>\n    <div>\n        With Twitter: <a href=\"/auth/twitter\">click here</a>\n    </div>\n</div>");
$templateCache.put("app/navbar.tpl.html","<nav class=\"navbar navbar-default navbar-static-top m0 navbar-scrum\">\n    <div class=\"container\">\n        <div class=\"navbar-header\">\n            <button type=\"button\" class=\"navbar-toggle collapsed\" data-toggle=\"collapse\" data-target=\"#navbar\" aria-expanded=\"false\" aria-controls=\"navbar\">\n                <span class=\"sr-only\">Toggle navigation</span>\n                <span class=\"icon-bar\"></span>\n                <span class=\"icon-bar\"></span>\n                <span class=\"icon-bar\"></span>\n            </button>\n            <a class=\"navbar-brand\" href=\"#\">Scrum Board</a>\n        </div>\n        <div id=\"navbar\" class=\"navbar-collapse collapse\">\n            <ul class=\"nav navbar-nav\">\n                <li ng-class=\"{\'active\': location === \'/first-link\'}\"><a href=\"#/first-link\">First link</a></li>\n            </ul>\n            <ul class=\"nav navbar-nav navbar-right\">\n                <li class=\"dropdown\">\n                    <a href=\"\" class=\"dropdown-toggle\" data-toggle=\"dropdown\" role=\"button\" aria-haspopup=\"true\" aria-expanded=\"false\"><img class=\"img-navbar\" ng-src=\"{{user.profilePicture}}\">{{user.name}} <span class=\"caret\"></span></a>\n                    <ul class=\"dropdown-menu\">\n                        <li><a href=\"\" ng-click=\"logout()\">Logout</a></li>\n                    </ul>\n                </li>\n            </ul>\n        </div>\n    </div>\n</nav>");
$templateCache.put("app/task-list.tpl.html","<div class=\"task-list\">\n    <div class=\"task-list-header\">\n        <h2>{{zones[zone]}}</h2>\n    </div>\n    <ul dnd-list=\"list\"\n        dnd-drop=\"dropCallback(index, item, external, type, zone)\">\n        <li ng-repeat=\"item in list\"\n            dnd-draggable=\"item\"\n            dnd-effect-allowed=\"move\"\n            dnd-moved=\"list.splice($index, 1)\"\n            dnd-selected=\"selected === item ? selected = null : selected = item\"\n            ng-class=\"{selected: selected === item}\">\n            <task task=\"item\" selected=\"selected === item\"></task>\n        </li>\n    </ul>\n</div>");
$templateCache.put("app/task.tpl.html","<div class=\"task\">\n    <div class=\"task-name\">{{task.name}}</div>\n    <div class=\"text-right\">\n        <img class=\"task-assigned-to\" ng-src=\"{{task.assignedTo.imageUrl}}\" />\n    </div>\n\n    <div class=\"description\" ng-show=\"selected\">{{task.description}}</div>\n</div>");
$templateCache.put("app/modal/sprint-add-modal.tpl.html","<div class=\"modal-header\">\n    <h3 class=\"modal-title\">Create new sprint!</h3>\n</div>\n<div class=\"modal-body\">\n    <div class=\"row\">\n        <div class=\"col-md-12\">\n            <h4>Name</h4>\n            <input type=\"text\" class=\"form-control\" title=\"Name\" ng-model=\"sprint.name\" />\n            <p class=\"input-group\">\n            </p>\n        </div>\n\n        <div class=\"col-md-6\">\n            <h4>From</h4>\n            <p class=\"input-group\">\n                <input type=\"text\" class=\"form-control\" uib-datepicker-popup ng-model=\"sprint.fromDate\"\n                       is-open=\"popupFrom.opened\" datepicker-options=\"dateOptions\" ng-required=\"true\"\n                       close-text=\"Close\"/>\n                <span class=\"input-group-btn\">\n                    <button type=\"button\" class=\"btn btn-default\" ng-click=\"openFrom()\">\n                        <i class=\"glyphicon glyphicon-calendar\"></i>\n                    </button>\n                </span>\n            </p>\n        </div>\n\n        <div class=\"col-md-6\">\n            <h4>To</h4>\n            <p class=\"input-group\">\n                <input type=\"text\" class=\"form-control\" uib-datepicker-popup ng-model=\"sprint.toDate\"\n                       is-open=\"popupTo.opened\" datepicker-options=\"dateOptions\" ng-required=\"true\"\n                       close-text=\"Close\">\n                <span class=\"input-group-btn\">\n                    <button type=\"button\" class=\"btn btn-default\" ng-click=\"openTo()\">\n                        <i class=\"glyphicon glyphicon-calendar\"></i>\n                    </button>\n                </span>\n            </p>\n        </div>\n\n        <div class=\"col-md-12\">\n            <div ng-show=\"error\" class=\"panel panel-danger\">\n                <div class=\"panel-heading\">{{ error }}</div>\n            </div>\n        </div>\n    </div>\n</div>\n<div class=\"modal-footer\">\n    <button class=\"btn btn-primary\" type=\"button\" ng-click=\"ok()\">OK</button>\n    <button class=\"btn btn-warning\" type=\"button\" ng-click=\"cancel()\">Cancel</button>\n</div>");}]);