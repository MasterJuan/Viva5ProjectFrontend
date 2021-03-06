import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { ProjectService, UserService } from '../../services/index';
import { Project } from '../../models/index';

@Component({
	moduleId: module.id,
    selector: 'all-projects-list',
    templateUrl: 'projectList.component.html'
})

export class ProjectListComponent implements OnInit { 
	//projects: Array<Project> = [];
    
    @Input() projects: Project[] = null;
    
    actionPassed: string = 'getAllProjects';
    
    title: string;
    
	constructor(
        private route: ActivatedRoute,
        private projectService: ProjectService,
        private userService: UserService
	) {}
	
	ngOnInit() {
        if(this.route.data && this.projects == null) {
            this.route.data
                .subscribe(
                    value => { 
                        this.actionPassed = value['action'];
                    }
                );    
        
            switch(this.actionPassed) {
                case 'getAllProjects':
                    this.title = "All Projects";
                    this.projectService
                        .getAllProjects()
                        .subscribe(
                            (data: Project[]) => {
                                this.projects = data;
                            },
                            (err) => {
                                alert(err);
                            }
                        );
                    break;
                case 'getTrendingProjects':
                    this.title = "Top 10 Trending Projects";
                    this.projectService
                        .getTrendingProjects()
                        .subscribe(
                            (data: Project[]) => {
                                this.projects = data;
                            },
                            (err) => {
                                alert(err);
                            }
                        );
                    break;
                case 'getMyCompletedProjects':
                    this.title = "My Completed Backed Projects";
                    this.userService
                        .getUserFundedCompletedProjects(true)
                        .subscribe(
                            (data: Project[]) => {
                                this.projects = data;
                            },
                            (err) => {
                                alert(err);
                            }
                        );
                    break;
            }
        }
        
    }
}
